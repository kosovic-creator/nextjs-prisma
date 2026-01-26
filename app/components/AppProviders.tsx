"use client";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "../context/SidebarContext";
import Navbar from "./Navbar";
import { Suspense } from "react";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        {children}
      </SidebarProvider>
    </SessionProvider>
  );
}
