import Link from "next/link";

export default function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-4">Zabranjeno</h2>
      <p>Nemate dozvolu za pristup ovoj stranici.</p>
      <Link href="/auth/prijava" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg">
        Nazad na prijavu
      </Link>
    </div>
  )
}
