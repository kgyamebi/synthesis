@echo off
REM Akwaaba Ghana - start a local server and open the app
cd /d "%~dp0"
start "" http://127.0.0.1:8000/index.html
python -m http.server 8000
