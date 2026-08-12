from __future__ import annotations

import fitz
import pytest


@pytest.fixture
def synthetic_statement(tmp_path):
    path = tmp_path / "fake_statement.pdf"
    document = fitz.open()
    for page_number in range(2):
        page = document.new_page()
        lines = [
            "DEMO COMMUNITY BANK — SYNTHETIC TEST DATA",
            "STATEMENT FOR: JANE SAMPLE",
            "123 DEMO STREET",
            "ANYTOWN, NY 10001",
            "ACCOUNT NUMBER: 1234 5678 9012",
            "ROUTING NUMBER: 021000021",
            "CUSTOMER NUMBER: CUST-FAKE-4821",
            "jane.sample@example.test   (212) 555-0198",
            "Statement Period: January 1–31, 2026",
            "01/05 DEMO GROCERY  -$42.18   BALANCE $957.82",
        ]
        for i, line in enumerate(lines):
            page.insert_text((55, 65 + i * 28), line, fontsize=11)
        page.insert_text((55, 760), "Account 1234 5678 9012", fontsize=9)
    document.save(path)
    document.close()
    return path
