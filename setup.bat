@echo off
echo ========================================
echo    FounderHubAi Setup Script
echo ========================================
echo.

echo [1/5] Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://python.org
    pause
    exit /b 1
)
echo ✓ Python is installed

echo.
echo [2/5] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 16+ from https://nodejs.org
    pause
    exit /b 1
)
echo ✓ Node.js is installed

echo.
echo [3/5] Setting up backend...
cd apps\backend
if not exist .env (
    echo Creating .env file from template...
    copy .env.example .env
    echo ⚠️  Please edit .env file and add your OpenAI API key
)
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install Python dependencies
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed

echo.
echo [4/5] Setting up frontend...
cd ..\frontend
npm install
if errorlevel 1 (
    echo ERROR: Failed to install Node.js dependencies
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed

echo.
echo [5/5] Setup complete!
echo.
echo To run the application:
echo 1. Start backend: cd apps\backend && python main.py
echo 2. Start frontend: cd apps\frontend && npm run dev
echo 3. Open http://localhost:3000 in your browser
echo.
echo Don't forget to add your OpenAI API key to apps\backend\.env
echo.
pause 