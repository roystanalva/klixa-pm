@echo off
title Klixa ERP
cd /d "%~dp0"

:: Check for Node.js
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERROR: Node.js is not installed.
    echo Please download and install Node.js from https://nodejs.org
    pause
    exit /b 1
)

:: Install dependencies if needed
if not exist "node_modules\react" (
    echo Installing dependencies...
    call npm install --no-audit --no-fund 2>nul
)

:: Build production bundle if needed
if not exist "dist\index.html" (
    echo Building application bundle...
    if exist "node_modules\.cache" rmdir /s /q "node_modules\.cache" 2>nul
    call npm run build 2>nul
    if %ERRORLEVEL% neq 0 (
        echo Build failed. Running dev mode instead...
        set DEV=1
    )
)

echo.
echo  ========================================
echo     Klixa ERP  v1.0.0
echo     Starting server...
echo  ========================================
echo.

if defined DEV (
    start http://localhost:5173
    npx vite --port 5173
) else (
    start http://localhost:3000
    node server.js
)

pause
