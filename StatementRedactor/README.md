# Offline Statement Redactor

A Windows desktop privacy tool for review-first, **true PDF redaction** of bank and
credit-card statements. All statement text, OCR, detection, rendering, and verification
remain on the computer. The application contains no networking, telemetry, analytics,
cloud AI, or cloud OCR code.

## Safety model

- Automatic scanning creates **pending proposals only**. A person must approve them.
- Approved regions become PyMuPDF redaction annotations and are permanently processed
  with `Page.apply_redactions()`; the app never relies on cosmetic rectangles.
- The original path is rejected as an output, existing output files are not replaced,
  and the result is saved with PDF cleanup and garbage collection.
- Verification independently reopens the output, checks page count, source hash,
  extractable approved text, and opaque rendered regions. It writes a privacy-safe
  `_verification.txt` report containing no detected values.
- No software can promise absolute forensic impossibility. Keep the original secure and
  review both the sanitized PDF and the verification result before sharing.

## Windows installation and launch

1. Install 64-bit Python 3.11 or newer from Python.org and enable the `py` launcher.
2. For scanned PDFs, install the local Windows build of Tesseract OCR. Add its install
   folder to `PATH`. Native-text PDFs do not require Tesseract.
3. Copy this directory to `C:\StatementRedactor`.
4. While dependencies are initially available, double-click `start_redactor.bat`.
   It creates a private `.venv` and installs pinned dependency ranges.
5. After installation, disconnecting the computer does not affect the complete workflow.
   Double-click `start_redactor.bat` again to launch without a terminal.

For an explicitly offline dependency installation, download wheels on a connected machine:

```powershell
py -3.11 -m pip download -r requirements.txt -d wheels
py -3.11 -m venv .venv
.venv\Scripts\pip install --no-index --find-links wheels -r requirements.txt
```

## Workflow

1. **Open PDF** (multi-select is supported) or **Open Folder**.
2. Use page controls, zoom, fit page, and fit width to inspect every page.
3. Run **Automatic Scan**. Native PDF words are always preferred; sparse/image-only
   pages use local Tesseract with coordinates mapped back to the PDF.
4. Review the page overlays and proposal table. Approve/reject individually, approve all
   high-confidence proposals, or select one and choose **Redact all occurrences**.
5. Toggle **Manual rectangle tool** and drag over anything detection missed. Manual boxes
   begin approved, remain reviewable, and can be deleted.
6. Choose **Finalize & Save**. The default is `ORIGINAL_FILENAME_REDACTED.pdf`; selecting
   the original or an existing file is refused.
7. Read the PASS/WARNING dialog and adjacent
   `ORIGINAL_FILENAME_REDACTED_verification.txt` report.

Detection is deterministic and targets labelled account/routing/member/customer fields,
holder labels, street addresses, phone numbers, email, SSN/tax patterns, repeated value
keys, and QR codes. Unlabelled numeric candidates are deliberately lower confidence to
protect transaction amounts, balances, dates, merchants, fees, and statement periods.

## Development and synthetic tests

Only generated fake statements are used by the test suite.

```powershell
py -3.11 -m venv .venv
.venv\Scripts\pip install -r requirements.txt
.venv\Scripts\python -m pytest
```

The offline acceptance test monkeypatches both common outbound socket connection paths to
raise immediately, then completes open, detect, approve, redact, save, and verification.
The scanned-page test injects fake local OCR word boxes so CI does not require Tesseract;
manually validate a synthetic raster statement with the installed Tesseract before release.

## Privacy-safe diagnostics

The structural logger records only counts and error state. Never add extracted text,
detected values, transaction descriptions, addresses, balances, or account data to logs or
exception messages. Verification reports contain filenames, counts, categories, and result
statuses only.
