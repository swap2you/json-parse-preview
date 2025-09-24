@echo off
cd /d "c:\Dev Resources\Workspace\CustomProj\JsonParsePreview"
echo === Current Git Status ===
git status
echo.
echo === Recent Commits ===
git log --oneline -n 3
echo.
echo === Current Branch ===  
git branch