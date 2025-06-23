#!/bin/bash

echo "========================================"
echo "    FounderHubAi Setup Script"
echo "========================================"
echo

echo "[1/5] Checking Python installation..."
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed or not in PATH"
    echo "Please install Python 3.8+ from https://python.org"
    exit 1
fi
echo "✓ Python is installed"

echo
echo "[2/5] Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed or not in PATH"
    echo "Please install Node.js 16+ from https://nodejs.org"
    exit 1
fi
echo "✓ Node.js is installed"

echo
echo "[3/5] Setting up backend..."
cd apps/backend
if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file and add your OpenAI API key"
fi
pip3 install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install Python dependencies"
    exit 1
fi
echo "✓ Backend dependencies installed"

echo
echo "[4/5] Setting up frontend..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install Node.js dependencies"
    exit 1
fi
echo "✓ Frontend dependencies installed"

echo
echo "[5/5] Setup complete!"
echo
echo "To run the application:"
echo "1. Start backend: cd apps/backend && python3 main.py"
echo "2. Start frontend: cd apps/frontend && npm run dev"
echo "3. Open http://localhost:3000 in your browser"
echo
echo "Don't forget to add your OpenAI API key to apps/backend/.env"
echo 