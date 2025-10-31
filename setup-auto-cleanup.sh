#!/bin/bash

# EC2 자동 정리 Cron 설정 스크립트
# EC2에서 한 번만 실행하면 됩니다

echo "🔧 자동 정리 Cron 설정 중..."

# cleanup 스크립트 권한 설정
chmod +x /home/ubuntu/bohumstore/cleanup-ec2.sh

# 기존 cron 백업
crontab -l > /tmp/mycron 2>/dev/null || touch /tmp/mycron

# 이미 설정되어 있는지 확인
if grep -q "cleanup-ec2.sh" /tmp/mycron; then
    echo "⚠️  이미 자동 정리가 설정되어 있습니다."
else
    # 매월 1일 새벽 3시에 실행되도록 추가
    echo "0 3 1 * * cd /home/ubuntu/bohumstore && bash cleanup-ec2.sh >> /home/ubuntu/cleanup.log 2>&1" >> /tmp/mycron
    
    # 새로운 cron 적용
    crontab /tmp/mycron
    
    echo "✅ 자동 정리 설정 완료!"
    echo "📅 매월 1일 새벽 3시에 자동으로 디스크 정리가 실행됩니다."
    echo "📝 로그 위치: /home/ubuntu/cleanup.log"
fi

# 임시 파일 삭제
rm /tmp/mycron

echo ""
echo "현재 설정된 Cron 작업:"
crontab -l

echo ""
echo "✅ 설정 완료! 이제 매월 자동으로 정리됩니다."
