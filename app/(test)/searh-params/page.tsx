// app/dashboard/page.tsx
export default async function Page({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const search = params['search'] || 'Nema pretrage'
  return <div>Pretraga: {search}</div>
}
