/* eslint-disable react-hooks/set-state-in-effect */
'use client'
import { useState, useEffect } from 'react'

export default function SimpleLocal() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // Učitaj iz localStorage na mount-u
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved) setTheme(saved as 'light' | 'dark')
    }
  }, [])

  // Spremi u localStorage kad theme promijeni
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  return (
    <div className={theme === 'dark' ? 'bg-gray-900 text-white p-8' : 'bg-white text-black p-8'}>
      <h1>Tema: {theme}</h1>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
      >
        Toggle
      </button>
      <p className="mt-4 text-sm">Provjeri DevTools  Application  Local Storage</p>
    </div>
  )
}
