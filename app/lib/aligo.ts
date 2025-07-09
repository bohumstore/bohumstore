import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'
import multiparty from 'multiparty'

export interface AuthData {
  apikey: string
  userid: string
  senderkey: string
  // token 은 /token API 호출 후 받아와서 auth 에 주입해 주시면 됩니다.
  token?: string
}

// 1) NextRequest 객체(req)와 AuthData, 그리고 호출할 URI를 받아
//    파싱된 { ...auth, ...fields, uri } 형태의 객체를 리턴합니다.
export function formParse(
  req: { headers: Record<string,string>; body?: any },
  auth: AuthData,
  uri: string
): Promise<Record<string, any>> {
  return new Promise((resolve, reject) => {
    const contentType = req.headers['content-type'] || ''
    // multipart/form-data 일 때
    if (contentType.includes('multipart/form-data')) {
      const form = new multiparty.Form()
      form.parse(req as any, (err, fields, files) => {
        if (err) return reject(err)
        const out: Record<string, any> = { uri }
        // 인증정보
        Object.assign(out, auth)
        // 파일(image, fimage) 처리
        if (files.image) out.image = files.image
        if (files.fimage) out.fimage = files.fimage
        // 일반 필드
        for (const k in fields) {
          if (fields[k] && fields[k][0] !== undefined) {
            out[k] = fields[k][0]
          }
        }
        resolve(out)
      })
    } else {
      // application/json
      const out: Record<string, any> = { uri }
      Object.assign(out, auth)
      Object.assign(out, req.body || {})
      resolve(out)
    }
  })
}

// 2) formParse 결과를 POST form-data 로 변환해서 실제로 전송합니다.
export function postRequest(data: Record<string, any>): Promise<any> {
  const uri = data.uri
  const form = new FormData()

  for (const key in data) {
    if (key === 'uri') continue

    // 파일(image, fimage) 처리 (기존 로직)
    if (key === 'image' || key === 'fimage') {
      if (Array.isArray(data[key])) {
        const file = data[key][0]
        form.append(
          key,
          fs.createReadStream(file.path),
          {
            filename: file.originalFilename,
            contentType: file.headers['content-type']
          }
        )
      }

    // 그 외 일반 필드
    } else {
      const value = data[key]

      // 객체면 JSON.stringify
      if (typeof value === 'object') {
        form.append(key, JSON.stringify(value))
      } else {
        form.append(key, String(value))
      }
    }
  }

  return axios
    .post(uri, form, { headers: form.getHeaders() })
    .then(res => res.data)
}

// 3) 알림톡 전송용
export function alimtalkSend(req: any, auth: AuthData) {
  const uri = 'https://kakaoapi.aligo.in/akv10/alimtalk/send/'
  return formParse(req, auth, uri).then(postRequest)
}

// 4) Token 생성용
export function getToken(req: any, auth: AuthData) {
  const uri = 'https://kakaoapi.aligo.in/akv10/token/create/'
  return formParse(req, auth, uri).then(postRequest)
}
