@echo off
setlocal
cd /d "%~dp0"
if not exist ".venv\Scripts\python.exe" (
  echo First run: creating the local Python environment...
  py -3.11 -m venv .venv || goto :error
  ".venv\Scripts\python.exe" -m pip install --upgrade pip || goto :error
  ".venv\Scripts\python.exe" -m pip install -r requirements.txt || goto :error
)
".venv\Scripts\pythonw.exe" -m statement_redactor
exit /b 0
:error
echo Installation failed. Confirm Python 3.11+ is installed, then try again.
pause
exit /b 1
