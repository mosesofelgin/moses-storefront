from __future__ import annotations

import hashlib
import socket

import fitz
import pytest

from statement_redactor.engine import StatementDocument
from statement_redactor.models import Status


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def test_native_multipage_repeated_values_and_permanent_redaction(synthetic_statement, tmp_path):
    before = digest(synthetic_statement)
    statement = StatementDocument(synthetic_statement)
    result = statement.scan(use_ocr=False)
    account = [p for p in result.proposals if p.category == "account_number"][0]
    assert statement.approve_same_value(account) >= 2
    for proposal in result.proposals:
        if proposal.category in {"routing_number", "customer_id", "account_holder", "address"}:
            proposal.status = Status.APPROVED
    output = tmp_path / "safe.pdf"
    verification = statement.finalize(output)
    statement.close()

    assert verification.passed
    assert digest(synthetic_statement) == before
    assert output.exists() and verification.report_path.exists()
    sanitized = fitz.open(output)
    extracted = "".join(page.get_text() for page in sanitized)
    sanitized.close()
    assert "1234 5678 9012" not in extracted
    assert "021000021" not in extracted
    assert "DEMO GROCERY" in extracted
    assert "$42.18" in extracted
    assert "1234 5678 9012" not in verification.report_path.read_text()


def test_original_can_never_be_overwritten(synthetic_statement):
    statement = StatementDocument(synthetic_statement)
    statement.add_manual(0, (50, 50, 100, 80))
    with pytest.raises(ValueError, match="never be overwritten"):
        statement.finalize(synthetic_statement)
    statement.close()


def test_manual_redaction_removes_selected_content(synthetic_statement, tmp_path):
    statement = StatementDocument(synthetic_statement)
    statement.add_manual(0, (50, 45, 300, 80))
    output = tmp_path / "manual.pdf"
    result = statement.finalize(output)
    statement.close()
    assert result.passed
    with fitz.open(output) as document:
        assert "DEMO COMMUNITY BANK" not in document[0].get_text()


def test_complete_workflow_does_not_use_network(synthetic_statement, tmp_path, monkeypatch):
    def blocked(*args, **kwargs):
        raise AssertionError("outbound networking attempted")
    monkeypatch.setattr(socket, "create_connection", blocked)
    monkeypatch.setattr(socket.socket, "connect", blocked)
    statement = StatementDocument(synthetic_statement)
    scan = statement.scan(use_ocr=False)
    scan.proposals[0].status = Status.APPROVED
    result = statement.finalize(tmp_path / "offline.pdf")
    statement.close()
    assert result.passed


def test_scanned_page_uses_local_ocr_coordinates(tmp_path, monkeypatch):
    path = tmp_path / "scan.pdf"
    document = fitz.open(); document.new_page(); document.save(path); document.close()
    from statement_redactor import engine
    from statement_redactor.detection import Word
    from statement_redactor.ocr import OcrResult
    monkeypatch.setattr(engine, "extract_words", lambda page: OcrResult([
        Word(20, 20, 80, 35, "ACCOUNT"), Word(85, 20, 140, 35, "NUMBER:"),
        Word(145, 20, 225, 35, "1234567890")]))
    statement = StatementDocument(path)
    result = statement.scan()
    statement.close()
    assert result.ocr_pages == [1]
    assert result.proposals[0].source == "ocr"
    assert result.proposals[0].category == "account_number"
