@echo off
echo ============================================
echo   JsonParsePreview - Frontend Startup  
echo ============================================
echo.

echo Starting React Frontend Server...
echo Frontend will be available at: http://localhost:3000
echo Backend proxy configured for: http://localhost:8080
echo.
echo Make sure backend is running before using the app!
echo Press Ctrl+C to stop the server
echo ============================================
echo.

cd /d "%~dp0frontend"

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting development server...
call npm start

pause