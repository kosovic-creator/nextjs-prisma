'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <>
      <div className='flex flex-col'>

        <button
          type="button"
          onClick={() => router.push('/router', { scroll: false })}
        >
          RouterPush
        </button>
        <button
          type="button"
          onClick={() => router.replace('/router', { scroll: false })}
        >
          RouterReplace
        </button>

      </div>

    </>
  )
}
