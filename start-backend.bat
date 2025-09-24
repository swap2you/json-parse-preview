@echo off
echo ============================================
echo   JsonParsePreview - Backend Startup
echo ============================================
echo.

REM Set Java 17 Home (Updated to Java 17)
set JAVA_HOME=C:\Program Files\Java\jdk-17.0.12
set PATH=%JAVA_HOME%\bin;%PATH%

echo Java Version Check:
java -version
echo.

echo Starting Spring Boot Backend Server...
echo Server will be available at: http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo ============================================
echo.

cd /d "%~dp0backend"

REM Clean and start the backend
echo Cleaning previous build...
call mvn clean -q

echo Starting server...
call mvn spring-boot:run

pause