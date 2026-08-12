"""Create a deterministic source ZIP for the offline Statement Redactor."""

from __future__ import annotations

import hashlib
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "StatementRedactor"
OUTPUT = ROOT / "StatementRedactor-Windows-Source.zip"
CHECKSUM = OUTPUT.with_suffix(OUTPUT.suffix + ".sha256")
EXCLUDED_PARTS = {".venv", "__pycache__", ".pytest_cache"}
EXCLUDED_SUFFIXES = {".pyc", ".pyo"}


def included_files() -> list[Path]:
    return sorted(
        path
        for path in SOURCE.rglob("*")
        if path.is_file()
        and not EXCLUDED_PARTS.intersection(path.relative_to(SOURCE).parts)
        and path.suffix not in EXCLUDED_SUFFIXES
    )


def build() -> str:
    """Build the ZIP and sidecar checksum, returning the SHA-256 digest."""
    with ZipFile(OUTPUT, "w", compression=ZIP_DEFLATED, compresslevel=9) as archive:
        for path in included_files():
            relative = Path("StatementRedactor") / path.relative_to(SOURCE)
            info = ZipInfo(relative.as_posix(), date_time=(2026, 1, 1, 0, 0, 0))
            info.compress_type = ZIP_DEFLATED
            info.external_attr = 0o100644 << 16
            archive.writestr(info, path.read_bytes(), compresslevel=9)

    digest = hashlib.sha256(OUTPUT.read_bytes()).hexdigest()
    CHECKSUM.write_text(f"{digest}  {OUTPUT.name}\n", encoding="ascii")
    return digest


if __name__ == "__main__":
    print(f"Created {OUTPUT.name}: {build()}")
