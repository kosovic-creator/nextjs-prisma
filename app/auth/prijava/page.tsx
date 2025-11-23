"use client";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginForm
() {
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
        <p>Prijavljeni ste kao: <b>{session.user?.email}</b></p>
        <p>Vaša rola: <b>{session.user?.role}</b></p>
        <button onClick={() => signOut()} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">Odjavi se</button>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleLogin} className="p-4 border rounded flex flex-col gap-2 max-w-sm">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="border px-2 py-1 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="border px-2 py-1 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Prijavi se</button>
        {error && <p className="text-red-500">{error}</p>}
      </form>

    </>
  );
}