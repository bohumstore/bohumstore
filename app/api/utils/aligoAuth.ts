import { AuthData } from "@/app/lib/aligo";

const aligoAuth: AuthData = {
  apikey:    process.env.NEXT_PUBLIC_ALIGO_API_KEY!,
  userid:    process.env.NEXT_PUBLIC_ALIGO_USER_ID!,
  senderkey: process.env.NEXT_PUBLIC_ALIGO_SENDER_KEY!,
};

export default aligoAuth;