import { AuthData } from "@/app/lib/aligo";

// 서버/배포 환경별로 ALIGO_* 또는 NEXT_PUBLIC_ALIGO_* 어느 쪽이든 인식되도록 처리
const aligoAuth: AuthData = {
  apikey:    (process.env.ALIGO_API_KEY || process.env.NEXT_PUBLIC_ALIGO_API_KEY || ""),
  userid:    (process.env.ALIGO_USER_ID || process.env.NEXT_PUBLIC_ALIGO_USER_ID || ""),
  senderkey: (process.env.ALIGO_SENDER_KEY || process.env.NEXT_PUBLIC_ALIGO_SENDER_KEY || ""),
};

export default aligoAuth;