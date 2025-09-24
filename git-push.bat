@echo off
echo Checking in JsonParsePreview to GitHub...

git init
git config user.name "swap2you"
git config user.email "swap2you@gmail.com"
git remote add origin https://github.com/swap2you/json-parse-preview.git
git add .
git commit -m "feat: initial release of JsonParsePreview v1.0.0 - Complete full-stack JSON API response beautifier with Spring Boot 3.2.0 backend and React 18.2.0 frontend"
git branch -M main
git push -u origin main

echo.
echo Project successfully pushed to: https://github.com/swap2you/json-parse-preview
pause