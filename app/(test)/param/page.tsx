export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { page = '1', sort = 'asc', query = '' } = await searchParams
  const parems = await searchParams
  const strana = parems.page || '1'
  const paramss = new URLSearchParams();
  paramss.append('lang', 'jezik');
  const izbor = paramss.get('lang');
  return (
    <div>
      <h1>Product Listing</h1>
      <p>Search query: {query}</p>
      <p>Current page: {page}</p>
      <p>Sort order: {sort}</p>
      <p>{`Strana je: ${strana}`}</p>
      <p>Lang param sa (params.append) : {izbor}</p>
    </div>
  )

}