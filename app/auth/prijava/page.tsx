/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const langParam = searchParams?.get('lang');
  const lang = langParam === 'sr' || langParam === 'en' ? langParam : 'en';
  const t = (en: string, sr: string) => lang === 'sr' ? sr : en;
  type SessionUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
  type SessionType = { user?: SessionUser };
  const { data: session } = useSession() as { data: SessionType };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) setError(res.error);
  };

  if (session) {
    return (
      <div className="p-4 border rounded">
        <div className="flex justify-between mb-4">
          <span className="font-bold">{t('Login', 'Prijava')}</span>
          <div>
            <a href="?lang=en" className="mr-2 underline text-blue-600">EN</a>
            <a href="?lang=sr" className="underline text-blue-600">SR</a>
          </div>
        </div>
        <p>{t('Logged in as:', 'Prijavljeni ste kao:')} <b>{session.user?.email}</b></p>
        <p>{t('Your role:', 'Vaša rola:')} <b>{session.user?.role}</b></p>
        <button onClick={() => signOut()} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">{t('Sign out', 'Odjavi se')}</button>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleLogin} className="p-4 border rounded flex flex-col gap-2 max-w-sm">
        <div className="flex justify-between mb-4">
          <span className="font-bold">{t('Login', 'Prijava')}</span>
          <div>
            <a href="?lang=en" className="mr-2 underline text-blue-600">EN</a>
            <a href="?lang=sr" className="underline text-blue-600">SR</a>
          </div>
        </div>
        <input
          type="email"
          placeholder={t('Email', 'Email')}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="border px-2 py-1 rounded"
        />
        <input
          type="password"
          placeholder={t('Password', 'Lozinka')}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="border px-2 py-1 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{t('Sign in', 'Prijavi se')}</button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </>
  );
}