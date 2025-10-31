#!/bin/bash

# EC2 디스크 용량 자동 정리 스크립트
# EC2 서버에서 실행하거나 cron으로 자동 실행

echo "🧹 디스크 정리 시작..."

# 현재 용량 확인
echo "📊 현재 디스크 사용량:"
df -h /

# 1. npm 캐시 정리
echo "🗑️  npm 캐시 정리..."
npm cache clean --force 2>/dev/null || true

# 2. 시스템 패키지 정리
echo "🗑️  시스템 패키지 정리..."
sudo apt-get clean 2>/dev/null || true
sudo apt-get autoremove -y 2>/dev/null || true

# 3. 저널 로그 정리 (7일 이상 된 로그)
echo "🗑️  로그 파일 정리..."
sudo journalctl --vacuum-time=7d 2>/dev/null || true

# 4. PM2 로그 정리
echo "🗑️  PM2 로그 정리..."
pm2 flush 2>/dev/null || true

# 5. Docker 정리 (사용 중인 경우)
if command -v docker &> /dev/null; then
  echo "🗑️  Docker 정리..."
  docker system prune -f 2>/dev/null || true
fi

# 6. 임시 파일 정리
echo "🗑️  임시 파일 정리..."
sudo rm -rf /tmp/* 2>/dev/null || true

# 정리 후 용량 확인
echo ""
echo "✅ 정리 완료!"
echo "📊 정리 후 디스크 사용량:"
df -h /

# 용량 경고 (90% 이상 사용 시)
USAGE=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
if [ "$USAGE" -gt 90 ]; then
  echo ""
  echo "⚠️  경고: 디스크 사용량이 ${USAGE}%입니다!"
  echo "추가 정리가 필요할 수 있습니다."
fi
