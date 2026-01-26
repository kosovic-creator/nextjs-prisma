"use client";
import { Suspense } from "react";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "../context/SidebarContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SidebarProvider>

        <Suspense
        >
          {children}
        </Suspense>
      </SidebarProvider>
    </SessionProvider>
  );
}