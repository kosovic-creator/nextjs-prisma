/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import sr from '@/i18n/locales/sr/navbar.json';
import en from '@/i18n/locales/en/navbar.json';

export default function Navbar() {
  const searchParams = useSearchParams();
  const router = useRouter();

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
      <div className="flex gap-6 items-center">
        <Link href={withLang("/")} className="font-bold text-lg">{t.home}</Link>
        <Link href={withLang("/posts")} className="hover:underline">{t.posts}</Link>
      </div>
      <button
        onClick={handleLangSwitch}
        className="px-3 py-2 rounded-lg bg-gray-800 text-sm font-medium cursor-pointer"
      >
        {currentLang === "sr" ? "EN" : "SR"}
      </button>
    </nav>
  );
}
