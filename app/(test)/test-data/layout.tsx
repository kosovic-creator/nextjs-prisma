/* eslint-disable @typescript-eslint/no-unused-vars */

import { JSX, ReactNode } from "react";
import Navbar from "./components/Navbar";

export default async function TestLayout({
  children,
}: {
  children: ReactNode;
}): Promise<JSX.Element> {
  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <Navbar />
      {children}
    </main>
  );
}