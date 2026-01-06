/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useEffect } from 'react'
import { setThemeCookie } from '@/actions/cookies'

export default function ThemeSetter() {
  // useEffect(() => {
  //   setThemeCookie('dark')  // Ili new Date().toISOString()
  // }, [])

  return <>
    <div>Postavi theme cookie:</div>
    <div className='flex flex-col gap-4'>
      <button onClick={() => setThemeCookie('light')}>Postavi theme light</button>
      <button onClick={() => setThemeCookie('dark')}>Postavi theme dark</button>
    </div>
  </>



}
