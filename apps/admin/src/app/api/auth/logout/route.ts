import { tokenManager } from '@/libs/token/token-manager'
import { NextResponse } from 'next/server'

export async function POST() {
  await tokenManager.clearAccessToken()

  return NextResponse.json({
    code: 'OK',
    message: '로그아웃 되었습니다.',
    data: null,
  })
}
