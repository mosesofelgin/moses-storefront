from statement_redactor.detection import Word, detect_words


def words(line: str, y: float = 10):
    result, x = [], 10
    for value in line.split():
        result.append(Word(x, y, x + len(value) * 6, y + 12, value))
        x += len(value) * 6 + 5
    return result


def test_labelled_identifiers_and_contact_details_are_proposed():
    samples = ["ACCOUNT NUMBER: 1234 5678 9012", "ROUTING #: 021000021",
               "Email jane@example.test", "Phone (212) 555-0198", "123 DEMO STREET"]
    proposals = detect_words(0, sum((words(line, 10 + i * 20) for i, line in enumerate(samples)), []))
    categories = {proposal.category for proposal in proposals}
    assert {"account_number", "routing_number", "email", "phone", "address"} <= categories
    assert all(proposal.status.value == "PENDING" for proposal in proposals)


def test_financial_activity_is_not_automatically_redacted():
    proposals = detect_words(0, words("01/05 DEMO GROCERY PAYMENT $42.18 BALANCE $957.82"))
    assert proposals == []
