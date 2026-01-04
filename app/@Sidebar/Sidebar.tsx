"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/app/context/SidebarContext";

interface SidebarProps {
  lang: string;
}

const translations = {
  en: {
    menu: "Menu",
    home: "Home",
    posts: "Posts",
    newPost: "New Post",
    closeMenu: "Close menu",
  },
  sr: {
    menu: "Meni",
    home: "Početna",
    posts: "Postovi",
    newPost: "Novi post",
    closeMenu: "Zatvori meni",
  },
};

export default function Sidebar({ lang }: SidebarProps) {
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();
  const t = translations[lang as keyof typeof translations] || translations.en;

  const menuItems = [
    { href: "/", label: t.home, icon: "🏠" },
    { href: "/posts", label: t.posts, icon: "📝" },
    { href: "/posts/new", label: t.newPost, icon: "➕" },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 dark:bg-gray-800 min-h-screen p-6 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header with X button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {t.menu}
          </h2>
          <button
            onClick={close}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
            aria-label={t.closeMenu}
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
