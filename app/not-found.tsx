// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-black text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Stranica nije pronađena</h2>
        <p className="text-gray-600 mb-8">
          Traženi post ne postoji ili je obrisan.
        </p>
        <Link
          href="/posts"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Svi postovi
        </Link>
      </div>
    </div>
  )
}
