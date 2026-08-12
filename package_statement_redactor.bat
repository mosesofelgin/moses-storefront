@echo off
setlocal
cd /d "%~dp0"

where py >nul 2>nul
if errorlevel 1 (
  echo Python was not found. Install Python 3.11 or newer and try again.
  pause
  exit /b 1
)

py -3 scripts\package_statement_redactor.py
if errorlevel 1 (
  echo Could not create the ZIP file.
  pause
  exit /b 1
)

echo.
echo Created StatementRedactor-Windows-Source.zip
echo You can now move or share that ZIP file.
pause
