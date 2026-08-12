from __future__ import annotations

import hashlib
import re
from dataclasses import dataclass
from typing import Iterable

from .models import Confidence, Proposal


@dataclass(frozen=True, slots=True)
class Word:
    x0: float
    y0: float
    x1: float
    y1: float
    text: str


LABELS = re.compile(
    r"\b(?:ACCOUNT\s*(?:NUMBER|#)|ACCT\s*#|ROUTING\s*(?:NUMBER|#)|ABA|"
    r"MEMBER\s*(?:NUMBER|#)|CUSTOMER\s*(?:NUMBER|#)|STATEMENT\s+FOR|"
    r"PREPARED\s+FOR|ACCOUNT\s+HOLDER|TAX\s*ID|SSN)(?=\W|$)",
    re.I,
)
EMAIL = re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.I)
PHONE = re.compile(r"(?<!\d)(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}(?!\d)")
# Unlabelled contiguous 9-digit values are ambiguous with routing numbers. SSNs are
# therefore high-confidence only when conventionally separated; labelled values are
# handled by LABELS regardless of formatting.
SSN = re.compile(r"(?<!\d)\d{3}[- ]\d{2}[- ]\d{4}(?!\d)")
ROUTING = re.compile(r"(?<!\d)\d{9}(?!\d)")
ACCOUNTISH = re.compile(r"(?<![\d$])(?:\*{2,}|X{2,})?\d[\d -]{3,}\d(?!\d)", re.I)
ADDRESS = re.compile(
    r"\b\d{1,6}\s+[A-Z0-9.' -]+\s(?:ST(?:REET)?|AVE(?:NUE)?|RD|ROAD|BLVD|"
    r"DR(?:IVE)?|LN|LANE|CT|COURT|WAY|PKWY|PLACE|PL)\b", re.I
)
FINANCIAL_CONTEXT = re.compile(r"\b(?:BALANCE|PAYMENT|AMOUNT|TOTAL|DEPOSIT|WITHDRAWAL|FEE|INTEREST)\b", re.I)


def _key(value: str) -> str:
    normalized = re.sub(r"\W", "", value).casefold()
    return hashlib.sha256(normalized.encode()).hexdigest()[:20] if normalized else ""


def _rect(words: Iterable[Word], pad: float = 1.5) -> tuple[float, float, float, float]:
    ws = list(words)
    return (min(w.x0 for w in ws) - pad, min(w.y0 for w in ws) - pad,
            max(w.x1 for w in ws) + pad, max(w.y1 for w in ws) + pad)


def _lines(words: list[Word]) -> list[list[Word]]:
    lines: list[list[Word]] = []
    for word in sorted(words, key=lambda w: (round(w.y0 / 3), w.x0)):
        for line in lines:
            if abs(line[0].y0 - word.y0) <= max(3, (word.y1 - word.y0) * .45):
                line.append(word)
                break
        else:
            lines.append([word])
    return [sorted(line, key=lambda w: w.x0) for line in lines]


def detect_words(page: int, words: list[Word], source: str = "native") -> list[Proposal]:
    """Produce review proposals; no proposal is approved automatically."""
    found: list[Proposal] = []
    for line in _lines(words):
        text = " ".join(w.text for w in line)
        spans: list[tuple[re.Pattern[str], str, Confidence]] = [
            (EMAIL, "email", Confidence.HIGH), (PHONE, "phone", Confidence.HIGH),
            (SSN, "ssn_or_tax_id", Confidence.HIGH), (ADDRESS, "address", Confidence.MEDIUM),
        ]
        for pattern, category, confidence in spans:
            for match in pattern.finditer(text):
                selected = _words_for_span(line, text, match.start(), match.end())
                found.append(Proposal(page, _rect(selected), category, confidence,
                                      value_key=_key(match.group()), source=source))

        label = LABELS.search(text)
        if label:
            after = text[label.end():].strip(" :#-")
            if after:
                selected = _words_for_span(line, text, text.find(after, label.end()), len(text))
                category = _category_for_label(label.group())
                found.append(Proposal(page, _rect(selected), category, Confidence.HIGH,
                                      value_key=_key(after), source=source))

        # Unlabelled 9-digit routing/account-like values are deliberately medium/low.
        if not label and not FINANCIAL_CONTEXT.search(text):
            for match in ROUTING.finditer(text):
                selected = _words_for_span(line, text, match.start(), match.end())
                found.append(Proposal(page, _rect(selected), "possible_routing_number", Confidence.MEDIUM,
                                      value_key=_key(match.group()), source=source))
            for match in ACCOUNTISH.finditer(text):
                digits = re.sub(r"\D", "", match.group())
                if 4 <= len(digits) <= 17 and not ROUTING.fullmatch(match.group()):
                    selected = _words_for_span(line, text, match.start(), match.end())
                    found.append(Proposal(page, _rect(selected), "possible_account_id", Confidence.LOW,
                                          value_key=_key(match.group()), source=source))
    return _dedupe(found)


def _words_for_span(words: list[Word], line_text: str, start: int, end: int) -> list[Word]:
    result, cursor = [], 0
    for word in words:
        pos = line_text.find(word.text, cursor)
        word_end = pos + len(word.text)
        if pos < end and word_end > start:
            result.append(word)
        cursor = word_end + 1
    return result or words


def _category_for_label(label: str) -> str:
    value = label.upper()
    if "ROUTING" in value or value == "ABA": return "routing_number"
    if "STATEMENT FOR" in value or "PREPARED FOR" in value or "HOLDER" in value: return "account_holder"
    if "MEMBER" in value: return "member_id"
    if "CUSTOMER" in value: return "customer_id"
    if "SSN" in value or "TAX" in value: return "ssn_or_tax_id"
    return "account_number"


def _dedupe(items: list[Proposal]) -> list[Proposal]:
    result: list[Proposal] = []
    for item in items:
        if not any(item.page == x.page and _overlap(item.rect, x.rect) > .75 for x in result):
            item.id = len(result) + 1
            result.append(item)
    return result


def _overlap(a: tuple[float, ...], b: tuple[float, ...]) -> float:
    x0, y0, x1, y1 = max(a[0], b[0]), max(a[1], b[1]), min(a[2], b[2]), min(a[3], b[3])
    intersection = max(0, x1 - x0) * max(0, y1 - y0)
    area = min((a[2] - a[0]) * (a[3] - a[1]), (b[2] - b[0]) * (b[3] - b[1]))
    return intersection / area if area else 0
