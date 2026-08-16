@echo off
rem ============================================================
rem  Pipi AI Project Assistant - Launcher (ASCII bootstrap)
rem  Chinese UI / env & dependency checks are handled by
rem  start_pipi.py to avoid Windows cmd encoding issues.
rem ============================================================
cd /d "%~dp0"

where python >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python not found.
    echo Please install Python 3.10+ and check "Add to PATH".
    echo Download: https://www.python.org/downloads/
    pause
    exit /b 1
)

python start_pipi.py %*
if errorlevel 1 pause
exit /b %errorlevel%
