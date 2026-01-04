"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Sidebar from "./Sidebar";

function SidebarContent() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";

  return <Sidebar lang={lang} />;
}

export default function SidebarSlot() {
  return (
    <Suspense fallback={<div className="w-64 bg-gray-100 dark:bg-gray-800 min-h-screen md:block hidden" />}>
      <SidebarContent />
    </Suspense>
  );
}
