"use client";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import Navbar from "./Navbar";

type ClientLayoutProps = {
  children: React.ReactNode;
  lang: string;
};

export default function ClientLayout({ children, lang }: ClientLayoutProps) {
  return (
    <SessionProvider>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <div lang={lang}>{children}</div>
    </SessionProvider>
  );
}
