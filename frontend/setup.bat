@echo off
REM Frontend Quick Setup Script for Windows

echo.
echo 🚀 CRM Frontend Setup
echo =====================
echo.

REM Check if Node is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODEVERSION=%%i
echo ✓ Node.js %NODEVERSION% detected
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm install failed
    pause
    exit /b 1
)

echo.
echo ✓ Dependencies installed successfully!
echo.
echo 🎉 Setup complete!
echo.
echo Next steps:
echo   1. Create .env file: copy .env.example .env
echo   2. Start dev server: npm run dev
echo   3. Open http://localhost:5173
echo.
pause
