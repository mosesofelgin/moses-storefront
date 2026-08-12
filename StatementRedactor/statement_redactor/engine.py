from __future__ import annotations

import hashlib
from dataclasses import dataclass
from pathlib import Path

import fitz

from .detection import Word, detect_words
from .models import Confidence, Proposal, Status
from .ocr import OcrUnavailable, detect_qr_codes, extract_words
from .privacy import LOGGER


@dataclass(slots=True)
class ScanResult:
    proposals: list[Proposal]
    ocr_pages: list[int]
    warnings: list[str]


@dataclass(slots=True)
class VerificationResult:
    passed: bool
    checks: dict[str, str]
    report_path: Path


class StatementDocument:
    def __init__(self, source: str | Path):
        self.source = Path(source).resolve()
        if not self.source.is_file() or self.source.suffix.lower() != ".pdf":
            raise ValueError("Select an existing PDF file")
        self._source_hash = _sha256(self.source)
        self.document = fitz.open(self.source)
        if self.document.needs_pass:
            self.document.close()
            raise ValueError("Password-protected PDFs are not supported")
        self.proposals: list[Proposal] = []

    def close(self) -> None:
        self.document.close()

    def scan(self, use_ocr: bool = True) -> ScanResult:
        proposals, ocr_pages, warnings = [], [], []
        for page_number, page in enumerate(self.document):
            native = [Word(*w[:4], w[4]) for w in page.get_text("words") if str(w[4]).strip()]
            usable = len(native) >= 5 and len("".join(w.text for w in native)) >= 30
            words, source = native, "native"
            if not usable and use_ocr:
                try:
                    words = extract_words(page).words
                    source = "ocr"
                    ocr_pages.append(page_number + 1)
                except OcrUnavailable:
                    warnings.append(f"Page {page_number + 1}: local Tesseract unavailable")
            proposals.extend(detect_words(page_number, words, source))
            for rect in detect_qr_codes(page):
                proposals.append(Proposal(page_number, rect, "qr_code", Confidence.HIGH, source="image"))
        for number, proposal in enumerate(proposals, 1):
            proposal.id = number
        self.proposals = proposals
        LOGGER.info("Scan completed: pages=%d proposals=%d ocr_pages=%d", len(self.document), len(proposals), len(ocr_pages))
        return ScanResult(proposals, ocr_pages, warnings)

    def add_manual(self, page: int, rect: tuple[float, float, float, float]) -> Proposal:
        proposal = Proposal(page, rect, "manual", Confidence.HIGH, Status.APPROVED,
                            source="manual", id=len(self.proposals) + 1)
        self.proposals.append(proposal)
        return proposal

    def approve_same_value(self, proposal: Proposal) -> int:
        if not proposal.value_key:
            return 0
        count = 0
        for item in self.proposals:
            if item.value_key == proposal.value_key:
                item.status = Status.APPROVED
                count += 1
        return count

    def finalize(self, output: str | Path | None = None) -> VerificationResult:
        approved = [p for p in self.proposals if p.approved()]
        if not approved:
            raise ValueError("Approve at least one redaction before saving")
        default = self.source.with_name(f"{self.source.stem}_REDACTED.pdf")
        target = Path(output).resolve() if output else default
        if target == self.source:
            raise ValueError("The original PDF can never be overwritten")
        if target.exists():
            raise FileExistsError(f"Output already exists: {target.name}")
        if target.suffix.lower() != ".pdf":
            raise ValueError("Output must be a PDF")

        secrets: list[str] = []
        for proposal in approved:
            page = self.document[proposal.page]
            clipped = page.get_text("text", clip=fitz.Rect(proposal.rect)).strip()
            if clipped:
                secrets.append(clipped)
            page.add_redact_annot(fitz.Rect(proposal.rect), fill=(0, 0, 0))
        for page in self.document:
            page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_PIXELS)
        target.parent.mkdir(parents=True, exist_ok=True)
        self.document.save(target, garbage=4, clean=True, deflate=True)
        LOGGER.info("Redacted copy saved: pages=%d redactions=%d", len(self.document), len(approved))
        return verify(self.source, target, self._source_hash, approved, secrets)


def verify(source: Path, output: Path, source_hash: str, approved: list[Proposal],
           sensitive_text: list[str]) -> VerificationResult:
    checks: dict[str, str] = {}
    try:
        sanitized = fitz.open(output)
        checks["output_opens"] = "PASS"
    except Exception:
        checks["output_opens"] = "WARNING"
        return _report(source, output, approved, checks)
    with fitz.open(source) as original:
        checks["page_count"] = "PASS" if len(sanitized) == len(original) else "WARNING"
    checks["original_unchanged"] = "PASS" if _sha256(source) == source_hash else "WARNING"
    output_text = "\n".join(page.get_text("text") for page in sanitized)
    remaining = [value for value in sensitive_text if len(value.strip()) >= 3 and value in output_text]
    checks["approved_text_not_extractable"] = "PASS" if not remaining else "WARNING"
    opaque = True
    for proposal in approved:
        page = sanitized[proposal.page]
        center = fitz.Rect(proposal.rect).irect
        pix = page.get_pixmap(clip=center, dpi=36, colorspace=fitz.csGRAY, alpha=False)
        if pix.samples and max(pix.samples) > 35:
            opaque = False
            break
    checks["regions_visually_opaque"] = "PASS" if opaque else "WARNING"
    sanitized.close()
    return _report(source, output, approved, checks)


def _report(source: Path, output: Path, approved: list[Proposal], checks: dict[str, str]) -> VerificationResult:
    passed = all(value == "PASS" for value in checks.values())
    report = output.with_name(f"{output.stem}_verification.txt")
    categories = ", ".join(sorted({p.category for p in approved}))
    content = ["Statement Redactor Verification", "", f"Source filename: {source.name}",
               f"Output filename: {output.name}", f"Redaction count: {len(approved)}",
               f"Categories redacted: {categories or 'none'}", ""]
    content.extend(f"{name}: {result}" for name, result in checks.items())
    content += ["", f"Overall: {'PASS' if passed else 'WARNING'}",
                "This verification does not claim absolute forensic impossibility."]
    report.write_text("\n".join(content) + "\n", encoding="utf-8")
    return VerificationResult(passed, checks, report)


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()
