'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <>
      <div className='flex flex-col-reverse'>

        <button
          type="button"
          onClick={() => router.back()}
        >
          RouterBack
        </button>
      </div>

    </>
  )
}
