"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";


export default function PrijavaContent() {
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
  const { data: session, status } = useSession() as { data: SessionType; status: string };

  // Lazy initialization - učitava se samo jednom pri inicijalizaciji
  const [email, setEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('rememberedEmail') || "";
    }
    return "";
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('rememberedEmail');
    }
    return false;
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Čuvaj ili briši email iz localStorage
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) setError(res.error);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 border rounded max-w-sm w-full">
          <div className="flex justify-between mb-4">
            <span className="font-bold">{t('Login', 'Prijava')}</span>
          </div>
          <p>{t('Logged in as:', 'Prijavljeni ste kao:')} <b>{session.user?.email}</b></p>
          <p>{t('Your role:', 'Vaša rola:')} <b>{session.user?.role}</b></p>
          <button onClick={() => signOut()} className="mt-2 px-4 py-2 bg-red-500 text-white rounded w-full">{t('Sign out', 'Odjavi se')}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="p-4 border rounded flex flex-col gap-2 max-w-sm w-full">
        <div className="flex justify-between mb-4">
          <span className="font-bold">{t('Login', 'Prijava')}</span>

        </div>
        <input
          type="email"
          placeholder={t('Email', 'Email')}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="border px-2 py-1 rounded"
        />
        <input
          type="password"
          placeholder={t('Password', 'Lozinka')}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="border px-2 py-1 rounded"
        />
        <label className="flex items-center gap-2 ">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
            className="cursor-pointer"
          />
          <span className="text-sm">{t('Remember my email', 'Zapamti moj email')}</span>
        </label>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded ">{t('Sign in', 'Prijavi se')}</button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}



