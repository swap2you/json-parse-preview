@echo off
echo ========================================
echo JsonParsePreview - Git Status Check
echo ========================================
echo.

cd /d "c:\Dev Resources\Workspace\CustomProj\JsonParsePreview"

echo Current Git Status:
echo -------------------
git status

echo.
echo Remote Repository:
echo -----------------
git remote -v

echo.
echo Recent Commits:
echo --------------
git log --oneline -5

echo.
echo Branch Information:
echo ------------------
git branch -a

echo.
echo Repository URL: https://github.com/swap2you/json-parse-preview
echo ========================================
pause