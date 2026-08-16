@echo off
rem ============================================================
rem  Pipi AI Project Assistant - Stop Streamlit (port 8501)
rem ============================================================
cd /d "%~dp0"

echo ================================
echo Pipi AI Project Assistant
echo Stopping Streamlit service (port 8501)...

rem 1) Kill process listening on port 8501
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":8501" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%p >nul 2>&1
)

rem 2) Fallback: kill python processes running "streamlit run app.py"
powershell -NoProfile -Command "Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'streamlit.*run.*app\.py' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }"

echo Done. If the service was running, it is now closed.
echo ================================
timeout /t 2 /nobreak >nul 2>&1 || ver >nul
exit /b 0
