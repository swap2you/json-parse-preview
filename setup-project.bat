@echo off
echo ================================================================
echo            JsonParsePreview - Complete Project Setup
echo ================================================================
echo.

REM Set Java 17 Home
set JAVA_HOME=C:\Program Files\Java\jdk-17.0.12
set PATH=%JAVA_HOME%\bin;%PATH%

echo Step 1: Java Environment Check
echo --------------------------------
echo JAVA_HOME: %JAVA_HOME%
java -version
echo.

if %ERRORLEVEL% neq 0 (
    echo ERROR: Java 17 not found at specified path!
    echo Please ensure Java 17 is installed at: C:\Program Files\Java\jdk-17.0.12
    echo Or update the JAVA_HOME path in this script.
    echo.
    pause
    exit /b 1
)

echo Step 2: Backend Setup
echo ----------------------
cd /d "%~dp0backend"

echo Cleaning previous builds...
call mvn clean

echo Compiling and testing backend...
call mvn clean compile test

if %ERRORLEVEL% neq 0 (
    echo ERROR: Backend compilation failed!
    echo Please check the error messages above.
    pause
    exit /b 1
)

echo ✅ Backend setup successful!
echo.

echo Step 3: Frontend Setup  
echo -----------------------
cd /d "%~dp0frontend"

echo Checking Node.js installation...
node --version
npm --version

if %ERRORLEVEL% neq 0 (
    echo ERROR: Node.js not found!
    echo Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo Installing frontend dependencies...
call npm install

if %ERRORLEVEL% neq 0 (
    echo ERROR: Frontend dependency installation failed!
    pause
    exit /b 1
)

echo ✅ Frontend setup successful!
echo.

echo Step 4: Project Structure Verification
echo ----------------------------------------
cd /d "%~dp0"

echo Checking project structure...
if exist "backend\pom.xml" (
    echo ✅ Backend: pom.xml found
) else (
    echo ❌ Backend: pom.xml missing
)

if exist "frontend\package.json" (
    echo ✅ Frontend: package.json found
) else (
    echo ❌ Frontend: package.json missing
)

if exist "examples\sample-api-collection.json" (
    echo ✅ Examples: Sample files found
) else (
    echo ❌ Examples: Sample files missing
)

if exist "docs\SETUP.md" (
    echo ✅ Documentation: Setup guide found
) else (
    echo ❌ Documentation: Setup guide missing
)

echo.

echo ================================================================
echo                        SETUP COMPLETE!
echo ================================================================
echo.
echo Next Steps:
echo 1. Open TWO terminal windows
echo 2. In Terminal 1: Run 'start-backend.bat' 
echo 3. In Terminal 2: Run 'start-frontend.bat'
echo 4. Open browser to http://localhost:3000
echo.
echo Test Files Available:
echo - examples\sample-api-collection.json
echo - examples\sample-json-response.json  
echo - test-simple.json
echo.
echo Documentation:
echo - README.md - Quick start guide
echo - SETUP.md - Detailed setup instructions
echo - docs\DEVELOPMENT.md - Development guidelines
echo.
echo Happy coding! 🚀
echo ================================================================

pause