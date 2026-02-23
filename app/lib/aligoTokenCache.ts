import { AuthData, getToken } from '@/app/lib/aligo'

type CachedToken = {
  token: string
  expireAtMs: number
}

let cached: CachedToken | null = null

function nowMs() {
  return Date.now()
}

export async function getCachedAligoToken(auth: AuthData): Promise<string | undefined> {
  try {
    // 유효 토큰 존재하면 재사용 (만료 60초 전부터는 재발급)
    if (cached && cached.expireAtMs - nowMs() > 60_000) {
      return cached.token
    }

    const req = {
      headers: { 'content-type': 'application/json' },
      body: {},
    }
    const res: any = await getToken(req, auth)
    // 예상 응답: { code: 0, token: '...', expires_in: 3600, ... }
    const token: string | undefined = res?.token
    const expiresInSec: number = typeof res?.expires_in === 'number' ? res.expires_in : 1800
    if (token) {
      cached = {
        token,
        // 안전 마진 60초
        expireAtMs: nowMs() + Math.max(60, expiresInSec - 60) * 1000,
      }
      return token
    }
  } catch (err) {
    // 토큰 발급 실패 시 무시하고 undefined 반환 (기존 전송 경로 사용)
    console.error('[ALIGO TOKEN] 발급 실패', (err as any)?.message || err)
  }
  return undefined
}


