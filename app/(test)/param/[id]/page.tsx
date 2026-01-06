export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>  // Dodaj params (u Next.js 15+ može biti Promise<{ id: string }> )
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await params  // Ako je async
  const resolvedSearch = await searchParams
  const { page = '1', sort = 'asc', query = '' } = resolvedSearch

  return (
    <div>
      <h1>Products Id: {resolvedParams.id}</h1>  {/* Koristi id */}
      <p>Search query: {query}</p>
      <p>Current page: {page}</p>
      <p>Sort order: {sort}</p>
    </div>
  )
}