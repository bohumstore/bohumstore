#!/bin/bash

# EC2 자동 정리 Cron 설정 스크립트
# EC2에서 실행하면 기존 설정을 "매일 새벽 4시"로 업데이트합니다.

echo "🔧 자동 정리 Cron 설정 업데이트 중..."

# cleanup 스크립트 권한 설정
chmod +x /home/ubuntu/bohumstore/cleanup-ec2.sh

# 1. 기존 cron 백업 (없으면 빈 파일 생성)
crontab -l > /tmp/mycron 2>/dev/null || touch /tmp/mycron

# 2. 기존 cleanup-ec2.sh 설정이 있다면 제거 (중복 방지 및 업데이트를 위해)
# grep -v를 사용하여 해당 문자열이 없는 줄만 남김
grep -v "cleanup-ec2.sh" /tmp/mycron > /tmp/mycron_new
mv /tmp/mycron_new /tmp/mycron

# 3. 매일 새벽 4시에 실행되도록 추가
# 0분 4시 매일 매월 매요일
echo "0 4 * * * cd /home/ubuntu/bohumstore && bash cleanup-ec2.sh >> /home/ubuntu/cleanup.log 2>&1" >> /tmp/mycron

# 4. 새로운 cron 적용
crontab /tmp/mycron

echo "✅ 자동 정리 설정 완료!"
echo "📅 매일 새벽 4시에 자동으로 디스크 정리가 실행됩니다."
echo "📝 로그 위치: /home/ubuntu/cleanup.log"

# 임시 파일 삭제
rm /tmp/mycron

echo ""
echo "현재 설정된 Cron 작업:"
crontab -l

echo ""
echo "✅ 설정이 업데이트되었습니다. 이제 매일 새벽 4시에 청소합니다."
