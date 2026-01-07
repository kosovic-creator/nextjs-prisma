'use client'

import { use } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

type PageProps = { params: Promise<{ id: string }> }

export default function Page({ params }: PageProps) {
  const { id } = use(params)
  const searchParams = useSearchParams()
  const query = searchParams.get('query') ?? ''
  const pathname = usePathname()

  return (
    <div>
      <h1>Product Details for ID: {id}</h1>
      <p>Search query: {query}</p>
      <p>Current pathname: {pathname}</p>
    </div>
  )
}