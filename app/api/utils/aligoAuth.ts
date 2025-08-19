import { AuthData } from "@/app/lib/aligo";

const aligoAuth: AuthData = {
  apikey:    process.env.ALIGO_API_KEY!,
  userid:    process.env.ALIGO_USER_ID!,
  senderkey: process.env.ALIGO_SENDER_KEY!,
};

export default aligoAuth;