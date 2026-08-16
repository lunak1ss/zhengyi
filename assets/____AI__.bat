@echo off
rem ============================================================
rem  Pipi AI Assistant - Desktop Launcher (ASCII bootstrap)
rem  Chinese UI / env & dependency checks are handled by
rem  desktop_launcher.py (GUI message boxes when errors occur).
rem ============================================================
cd /d "%~dp0"
set PIPI_MSG_BOX=1

where python >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python not found.
    echo Please install Python 3.9+ and check "Add to PATH".
    echo Download: https://www.python.org/downloads/
    pause
    exit /b 1
)

python desktop_launcher.py %*
if errorlevel 1 pause
exit /b %errorlevel%
