# 🚀 EC2 배포 가이드

## 문제 발생 원인
- 로컬에서 `git push`만 하고 EC2 서버에서 `git pull`을 안 해서 발생
- EC2 디스크 용량 부족 (99.8%)

---

## ✅ 앞으로 배포하는 방법

### 방법 1: Windows 배치 파일 사용 (가장 간단!)

1. 프로젝트 폴더에서 `deploy.bat` 더블클릭
2. 커밋 메시지 입력
3. GitHub에 자동으로 푸시됨
4. 안내 메시지에 따라 EC2에서 명령어 실행

---

### 방법 2: 수동 배포 (현재 방식)

#### 로컬 PC에서:
```bash
git add .
git commit -m "커밋 메시지"
git push origin master
```

#### EC2 서버에서:
1. AWS 콘솔 → EC2 → 인스턴스 → "연결" → "EC2 Instance Connect"
2. 터미널에서 실행:
```bash
cd /home/ubuntu/bohumstore
git pull origin master
npm install
npm run build
pm2 restart bohumstore
```

---

## 🧹 디스크 용량 관리

### 자동 정리 설정 (한 번만 실행):

```bash
cd /home/ubuntu/bohumstore
bash setup-auto-cleanup.sh
```

설정 후 **매월 1일 새벽 3시에 자동으로 정리**됩니다.

### 수동 정리 (필요시):

```bash
cd /home/ubuntu/bohumstore
bash cleanup-ec2.sh
```

또는 직접 실행:
```bash
# npm 캐시 정리
npm cache clean --force

# 시스템 정리
sudo apt clean
sudo apt autoremove -y

# 로그 정리
sudo journalctl --vacuum-time=7d

# PM2 로그 정리
pm2 flush

# 용량 확인
df -h
```

---

## 🔧 자동 배포 설정 (선택사항)

GitHub Actions가 이미 설정되어 있지만 비활성화 상태입니다.

활성화하려면:
1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. 다음 Secrets 추가:
   - `EC2_HOST`: EC2 IP 주소
   - `EC2_USER`: ubuntu
   - `EC2_PATH`: /home/ubuntu/bohumstore
   - `EC2_PEM_KEY`: SSH 키 내용
   - `PM2_APP`: bohumstore
   - `NODE_ENV`: production

3. `.github/workflows/deploy.yml` 파일이 자동으로 작동

---

## 📊 모니터링

### 디스크 용량 확인:
```bash
df -h
```

### PM2 상태 확인:
```bash
pm2 status
pm2 logs bohumstore
```

### 서버 재시작:
```bash
pm2 restart bohumstore
```

---

## ⚠️ 주의사항

1. **디스크 용량**: 90% 이상 차면 빌드 실패
   - 정기적으로 `cleanup-ec2.sh` 실행
   
2. **배포 후 확인**: 
   - 핸드폰 브라우저 캐시 삭제
   - 시크릿 모드로 확인

3. **긴급 상황**:
   - 디스크 가득 참: `rm -rf node_modules .next` 후 재설치
   - 서버 응답 없음: `pm2 restart bohumstore`

---

## 🎯 빠른 참조

### 로컬 → GitHub:
```bash
git add .
git commit -m "메시지"
git push origin master
```

### EC2 업데이트:
```bash
cd /home/ubuntu/bohumstore && git pull && npm install && npm run build && pm2 restart bohumstore
```

### 용량 정리:
```bash
npm cache clean --force && sudo apt clean && sudo apt autoremove -y
```
