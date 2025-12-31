/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signOut } from "next-auth/react"; // Dodaj ovo!
import sr from '@/i18n/locales/sr/navbar.json';
import en from '@/i18n/locales/en/navbar.json';

export default function Navbar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession(); // Dodaj ovo!

  // Uvijek čitaj jezik iz query parametara
  const currentLang = searchParams.get("lang") === "en" ? "en" : "sr";
  const t = currentLang === "sr" ? sr : en;

  // Helper za gradnju linkova s lang parametrom
  const withLang = (path: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", currentLang);
    return `${path}?${params.toString()}`;
  };

  // Promjena jezika bez reload-a
  const handleLangSwitch = () => {
    const newLang = currentLang === "sr" ? "en" : "sr";
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", newLang);
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      {/* Lijeva strana */}
      <div className="flex gap-6 items-center">
        <Link href={withLang("/")} className="font-bold text-lg">{t.home}</Link>
        <Link href={withLang("/posts")} className="hover:underline">{t.posts}</Link>
        <div className="relative group">
          <button className="hover:underline focus:outline-none">
            Test
          </button>
          <div className="absolute left-0 mt-2 w-32 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity z-10">
            <Link
              href="/trans"
              className="block px-4 py-2 hover:bg-gray-200 rounded-t"
            >
              Trans
            </Link>
          </div>
        </div>
      </div>
      {/* Desna strana */}
      <div className="flex items-center gap-4">
        {status === "loading" ? (
          <span>Učitavanje...</span>
        ) : session ? (
          <>
            <span className="font-semibold">{session.user?.name || session.user?.email}</span>
            <button
              onClick={() => signOut()}
              className="hover:underline bg-red-600 px-3 py-1 rounded"
            >{t.logout}</button>
          </>
        ) : (
          <>
            <button
              onClick={() => router.push('/auth/prijava')}
              className="hover:underline bg-green-600 px-3 py-1 rounded"
            >{t.login}</button>
            <Link href="/auth/register" className="hover:underline">{t.register}</Link>
          </>
        )}
        <button
          onClick={handleLangSwitch}
          className="px-3 py-2 rounded-lg bg-gray-800 text-sm font-medium cursor-pointer"
        >
          {currentLang === "sr" ? "EN" : "SR"}
        </button>
      </div>
    </nav>
  );
}
