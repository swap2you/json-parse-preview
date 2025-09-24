@echo off
echo ========================================
echo JsonParsePreview - Git Setup Script
echo ========================================
echo.

cd /d "c:\Dev Resources\Workspace\CustomProj\JsonParsePreview"

echo [1/8] Initializing Git repository...
git init
if %ERRORLEVEL% neq 0 (
    echo ERROR: Failed to initialize Git repository
    pause
    exit /b 1
)

echo [2/8] Setting up Git configuration...
git config user.name "swap2you"
git config user.email "swap2you@gmail.com"

echo [3/8] Adding remote repository...
git remote add origin https://github.com/swap2you/json-parse-preview.git
if %ERRORLEVEL% neq 0 (
    echo ERROR: Failed to add remote repository
    pause
    exit /b 1
)

echo [4/8] Checking Git status...
git status

echo [5/8] Adding all files to staging area...
git add .
if %ERRORLEVEL% neq 0 (
    echo ERROR: Failed to add files
    pause
    exit /b 1
)

echo [6/8] Creating initial commit...
git commit -m "feat: initial release of JsonParsePreview v1.0.0

- Add complete full-stack JSON API response beautifier
- Spring Boot 3.2.0 backend with Java 17
- React 18.2.0 frontend with Tailwind CSS
- Multi-format file upload (Collections, Environments, JSON)
- Interactive JSON tree viewer with modern UI
- API request execution with parameter substitution
- Comprehensive documentation suite
- Sample files and setup scripts
- CI/CD pipeline with GitHub Actions
- Professional project structure and best practices"

if %ERRORLEVEL% neq 0 (
    echo ERROR: Failed to create commit
    pause
    exit /b 1
)

echo [7/8] Setting main branch...
git branch -M main

echo [8/8] Pushing to GitHub repository...
echo.
echo IMPORTANT: You may be prompted to authenticate with GitHub
echo Please enter your GitHub username and personal access token when prompted
echo.
git push -u origin main

if %ERRORLEVEL% neq 0 (
    echo ERROR: Failed to push to GitHub
    echo.
    echo TROUBLESHOOTING:
    echo 1. Make sure you have created the repository on GitHub: https://github.com/swap2you/json-parse-preview
    echo 2. Ensure you have proper GitHub authentication set up
    echo 3. You may need to generate a Personal Access Token at: https://github.com/settings/tokens
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCCESS! Your code has been pushed to:
echo https://github.com/swap2you/json-parse-preview
echo ========================================
echo.
echo Next steps:
echo 1. Visit your repository on GitHub
echo 2. Set up branch protection rules
echo 3. Enable GitHub Pages if desired
echo 4. Add repository topics and description
echo.
pause