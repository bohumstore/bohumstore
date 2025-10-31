@echo off
chcp 65001 >nul
echo ========================================
echo 🚀 보험스토어 배포 스크립트
echo ========================================
echo.

REM 커밋 메시지 입력
set /p commit_msg="커밋 메시지를 입력하세요 (Enter만 누르면 '업데이트'): "
if "%commit_msg%"=="" set commit_msg=업데이트

echo.
echo 📝 커밋 메시지: %commit_msg%
echo.

REM Git 커밋 & 푸시
echo 📤 GitHub에 푸시 중...
git add .
git commit -m "%commit_msg%"
git push origin master

if errorlevel 1 (
    echo ❌ Git push 실패!
    pause
    exit /b 1
)

echo.
echo ✅ GitHub 푸시 완료!
echo.
echo ⚠️  이제 EC2 서버에 접속해서 다음 명령어를 실행하세요:
echo.
echo    cd /home/ubuntu/bohumstore
echo    git pull origin master
echo    npm install
echo    npm run build
echo    pm2 restart bohumstore
echo.
echo 또는 EC2 Instance Connect로 접속해서 실행하세요.
echo.

pause
