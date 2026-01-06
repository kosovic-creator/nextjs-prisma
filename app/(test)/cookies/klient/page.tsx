'use client'
import { useEffect } from 'react'
import { setThemeCookie } from '@/actions/cookies'

export default function ThemeSetter() {
  useEffect(() => {
    setThemeCookie('dark')  // Ili new Date().toISOString()
  }, [])

  return <button onClick={() => setThemeCookie('light')}>Postavi theme</button>
}
