'use server'
import { cookies } from 'next/headers'

export async function setThemeCookie(theme: string) {
  const cookieStore = await cookies()
  cookieStore.set('theme', theme, {
    httpOnly: true,  // Sigurnost: JS ne može čitati
    secure: process.env.NODE_ENV === 'production',  // HTTPS samo
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,  // 30 dana
    path: '/'
  })
}
export async function deleteCookie(name: string) {
  const cookieStore = await cookies()
  cookieStore.delete(name)
}
