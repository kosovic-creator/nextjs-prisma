/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import sr from '@/i18n/locales/sr/navbar.json';
import en from '@/i18n/locales/en/navbar.json';
import { useSidebar } from "@/app/context/SidebarContext";

export default function Navbar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toggle } = useSidebar();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const currentLang = searchParams.get("lang") === "en" ? "en" : "sr";
  const t = currentLang === "sr" ? sr : en;

  const pathname = usePathname();

  const withLang = (path: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", currentLang);
    return `${path}?${params.toString()}`;
  };

  const handleLangSwitch = () => {
    const newLang = currentLang === "sr" ? "en" : "sr";
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", newLang);
    router.push(`${pathname}?${params.toString()}`);
  };

  if (!mounted) {
    return (
      <nav className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
          {/* Static content during SSR */}
          <div className="w-32 h-8 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </nav>
    );
  }

  const loading = status === 'loading';

  return (
    <nav className="bg-gray-800 text-white px-4 py-3">
      <div className="flex justify-between items-center">
        {/* Hamburger Menu */}
        <button
          onClick={toggle}
          className="p-2 hover:bg-gray-700 rounded-md transition-colors touch-manipulation"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center flex-1 ml-6">
          <Link href={withLang("/")} className="font-bold text-lg">{t.home}</Link>
          <Link href={withLang("/posts")} className="hover:underline">{t.posts}</Link>
           <Link
                href="/crud"
                className="hover:underline"
              >
                Crud
              </Link>
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

        {/* Desktop Auth & Language */}
        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <div className="w-32 h-8 bg-gray-200 animate-pulse rounded"></div>
          ) : session ? (
            <>
              <span className="font-semibold truncate max-w-[150px]">
                {session.user?.name || session.user?.email}
              </span>
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
            className="px-3 py-2 rounded-lg bg-gray-700 text-sm font-medium cursor-pointer hover:bg-gray-600"
          >
            {currentLang === "sr" ? "EN" : "SR"}
          </button>
        </div>

        {/* Mobile Menu Button & Language */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={handleLangSwitch}
            className="px-2 py-1 rounded bg-gray-700 text-xs font-medium touch-manipulation"
          >
            {currentLang === "sr" ? "EN" : "SR"}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-700 rounded-md transition-colors touch-manipulation"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4 space-y-3">
          <Link
            href={withLang("/")}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:bg-gray-700 px-3 rounded"
          >
            {t.home}
          </Link>
          <Link
            href={withLang("/posts")}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:bg-gray-700 px-3 rounded"
          >
            {t.posts}
          </Link>

          <Link
            href="/crud"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:bg-gray-700 px-3 rounded"
          >
            Crud
          </Link>

          <div className="border-t border-gray-700 pt-3 mt-3 space-y-2">
            {!mounted || status === "loading" ? (
              <div className="h-20" />
            ) : session ? (
              <>
                <div className="px-3 py-2 text-sm font-semibold truncate">
                  {session.user?.name || session.user?.email}
                </div>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 px-3 bg-red-600 rounded hover:bg-red-700"
                >
                  {t.logout}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    router.push('/auth/prijava');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 px-3 bg-green-600 rounded hover:bg-green-700"
                >
                  {t.login}
                </button>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 hover:bg-gray-700 rounded"
                >
                  {t.register}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
