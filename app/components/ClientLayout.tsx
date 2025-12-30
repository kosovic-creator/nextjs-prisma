"use client";
import React from "react";
import Navbar from "./Navbar";
import { SessionProvider } from "next-auth/react";

type ClientLayoutProps = {
  children: React.ReactNode;
  lang: string;
  isLoggedIn?: boolean;
  korisnikIme?: string;
};

export default function ClientLayout({
  children,
  lang
}: ClientLayoutProps) {
  return (
    <>
      <SessionProvider>
        <Navbar lang={lang} />
        {children}
      </SessionProvider>

    </>
  );
}
