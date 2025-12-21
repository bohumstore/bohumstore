#!/bin/bash

# 배포 스크립트
# 사용법: ./deploy.sh "커밋 메시지"

set -e

echo "🚀 배포 시작..."

# 1. Git 커밋 & 푸시
if [ -n "$1" ]; then
  git add .
  git commit -m "$1" || echo "변경사항 없음"
fi

echo "📤 GitHub에 푸시 중..."
git push origin master

echo "⏳ 5초 대기 (GitHub 동기화)..."
sleep 5

# 2. EC2에 SSH 접속하여 배포
echo "🔄 EC2 서버 업데이트 중..."

# EC2 정보 (실제 값으로 변경 필요)
EC2_HOST="your-ec2-ip"  # 예: 3.37.112.222
EC2_USER="ubuntu"
EC2_KEY="path/to/your-key.pem"  # 예: ~/.ssh/bohumstore.pem
PROJECT_PATH="/home/ubuntu/bohumstore"

ssh -i "$EC2_KEY" "$EC2_USER@$EC2_HOST" << 'ENDSSH'
  cd /home/ubuntu/bohumstore
  
  echo "📥 최신 코드 가져오기..."
  git pull origin master
  
  echo "📦 패키지 설치..."
  npm install --quiet
  
  echo "🔨 빌드 중..."
  npm run build
  
  echo "♻️  서버 재시작..."
  pm2 restart bohumstore
  
  echo "✅ 배포 완료!"
ENDSSH

echo ""
echo "🎉 배포가 완료되었습니다!"
echo "🌐 사이트를 확인해보세요."
