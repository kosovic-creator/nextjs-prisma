/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      <div className="flex gap-6 items-center">
        <Link href="/" className="font-bold text-lg">Home</Link>
        <Link href="/posts/trans" className="hover:underline">PostsTrans</Link>
        <Link href="/posts" className="hover:underline">Posts</Link>
      </div>
      <div className="flex gap-4 items-center">
        {status === "loading" ? (
          <span>Učitavanje...</span>
        ) : session ? (
          <>
            <span className="font-semibold">{session.user?.name || session.user?.email}</span>
            <button
              onClick={() => signOut()}
              className="hover:underline bg-red-600 px-3 py-1 rounded"
            >Odjava</button>
          </>
        ) : (
          <>
            <button
              onClick={() =>router.push('/auth/prijava')}
              className="hover:underline bg-green-600 px-3 py-1 rounded"
            >Prijava</button>
            <Link href="/auth/register" className="hover:underline">Registracija</Link>
          </>
        )}
      </div>
    </nav>
  );
}
