
import { NextResponse } from "next/server"
import { supabase } from "../supabase"

export async function POST(req: Request) {
  const { phone, name, birth, gender, code } = await req.json()

  const { data, error } = await supabase
    .from('otp')
    .select('code, created_at')
    .eq('phone', phone)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: '인증정보를 찾을 수 없습니다.' }, { status: 404 })
  }

  const age = Date.now() - new Date(data.created_at).getTime()
  if (data.code !== code || age > 10 * 60 * 1000) {
    return NextResponse.json({ error: '인증번호가 틀리거나 만료되었습니다.' }, { status: 400 })
  }

  const { data: existingUser } = await supabase
    .from('user')
    .select('id')
    .eq('phone', phone)
    .single()

  let user = existingUser
  if (!user) {
    const { data: newUser, error } = await supabase
      .from('user')
      .insert({ phone, name, birth, gender })
      .select('id')
      .single()
    if (error) throw error
    user = newUser
  }

  return NextResponse.json({ success: true, userId: user.id })
}
