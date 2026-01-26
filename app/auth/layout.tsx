"use client";
import { Suspense } from "react";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";
import { SidebarProvider } from "../context/SidebarContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </SidebarProvider>
    </SessionProvider>
  );
}