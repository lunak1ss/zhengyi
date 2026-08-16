@echo off
rem ============================================================
rem  Pipi AI Project Assistant - Windows EXE Builder
rem  Entry : desktop_launcher.py
rem  Output: dist/皮皮AI助手.exe  (name finalized by finalize_exe.py)
rem ============================================================
cd /d "%~dp0"

where python >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python not found. Install Python 3.10+ and add to PATH.
    pause
    exit /b 1
)

echo [1/4] Installing PyInstaller ...
python -m pip install pyinstaller
if errorlevel 1 (
    echo [ERROR] Failed to install PyInstaller.
    pause
    exit /b 1
)

echo [2/4] Generating app icon ...
python make_icon.py
if errorlevel 1 (
    echo [ERROR] Failed to generate icon.
    pause
    exit /b 1
)

echo [3/4] Building EXE (this may take several minutes) ...
python -m PyInstaller --noconfirm --clean --onefile ^
    --name PipiAssistant ^
    --icon pipi_icon.ico ^
    --add-data "app.py;." ^
    --add-data "ops_agent/prompts;ops_agent/prompts" ^
    --collect-all streamlit ^
    --collect-all pypdfium2 ^
    desktop_launcher.py
if errorlevel 1 (
    echo [ERROR] PyInstaller build failed.
    pause
    exit /b 1
)

echo [4/4] Finalizing EXE name ...
python finalize_exe.py
if errorlevel 1 (
    echo [ERROR] Failed to finalize EXE name.
    pause
    exit /b 1
)

echo.
echo Build finished. See dist folder.
pause
exit /b 0
