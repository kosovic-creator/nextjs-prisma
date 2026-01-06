import { cookies } from 'next/headers'
import { Suspense } from 'react'

async function CookieList() {
  const cookieStore = await cookies()

  const theme = cookieStore.get('theme')

  return cookieStore.getAll().map((cookie) => (
    <div key={cookie.name}>
      <p>Name: {cookie.name}</p>
      <p>Value: {cookie.value}</p>
      <p>Theme Cookie: {theme ? theme.value : 'Not set'}</p>
      <hr />
    </div>
  ))
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading cookies...</div>}>
      <CookieList />
    </Suspense>
  )
}