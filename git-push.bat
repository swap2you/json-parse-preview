@echo off
setlocal enabledelayedexpansion

echo ========================================
echo  Git Push and Pull Request Creation
echo ========================================

cd /d "c:\Dev Resources\Workspace\CustomProj\JsonParsePreview"

echo Current directory: %cd%
echo.

REM Check Git status
echo [1/5] Checking Git status...
git status
if !errorlevel! neq 0 (
	echo ERROR: Git status failed
	pause
	exit /b 1
)

echo.
echo [2/5] Checking remote configuration...
git remote -v

echo.
echo [3/5] Pushing feature branch to remote...
git push -u origin feature/cleanup-and-modernize
if !errorlevel! neq 0 (
	echo Trying alternative push...
	git push origin feature/cleanup-and-modernize
)

echo.
echo [4/5] Checking if GitHub CLI is available...
gh --version >nul 2>&1
if !errorlevel! equ 0 (
	echo GitHub CLI found, creating pull request...
	gh pr create --title "feat: Comprehensive Project Modernization and Cleanup" --body "## 🚀 Comprehensive Project Modernization - This PR introduces major improvements to the JsonParsePreview project with modern UI enhancements, comprehensive documentation, and better code organization. ### ✨ Frontend Enhancements - Modern Tailwind CSS with custom animations - New modern components: LoadingSpinner.jsx and Button.jsx - Enhanced UI with gradient backgrounds ### 📚 Documentation - Modernized README.md with professional badges - Streamlined SETUP.md - Eliminated redundant files ### 💬 Backend Enhancement - Comprehensive JavaDoc documentation - Detailed method descriptions ### 🏗️ Code Organization - Modern UI patterns and best practices - Enhanced error handling - Professional modular structure ### 📊 Changes: 9 files, 855 insertions, 189 deletions" --base main --head feature/cleanup-and-modernize
) else (
	echo GitHub CLI not found. Please create PR manually at:
	echo https://github.com/swap2you/json-parse-preview/compare/main...feature/cleanup-and-modernize
)

echo.
echo ========================================
echo  Operations completed successfully!
echo ========================================
echo.
echo ✅ Branch 'feature/cleanup-and-modernize' pushed to remote
echo 📝 Create PR at: https://github.com/swap2you/json-parse-preview/compare/main...feature/cleanup-and-modernize
pause