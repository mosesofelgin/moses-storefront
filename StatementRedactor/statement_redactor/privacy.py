from __future__ import annotations

import logging
from pathlib import Path


def configure_logging(log_dir: Path | None = None) -> logging.Logger:
    """Create a structural-only logger. Callers must never pass extracted text."""
    logger = logging.getLogger("statement_redactor")
    if logger.handlers:
        return logger
    logger.setLevel(logging.INFO)
    handler: logging.Handler
    if log_dir:
        log_dir.mkdir(parents=True, exist_ok=True)
        handler = logging.FileHandler(log_dir / "statement_redactor.log", encoding="utf-8")
    else:
        handler = logging.NullHandler()
    handler.setFormatter(logging.Formatter("%(asctime)s %(levelname)s %(message)s"))
    logger.addHandler(handler)
    return logger


LOGGER = configure_logging()
