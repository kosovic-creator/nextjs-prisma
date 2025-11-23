"use client";
import { useState } from "react";
// import { signIn, signOut, useSession } from "next-auth/react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await res.json();
    if (data.error) setError(data.error);
    else setSuccess("Uspešna registracija! Sada se možete prijaviti.");
  };

  return (
    <form onSubmit={handleRegister} className="p-4 border rounded flex flex-col gap-2 max-w-sm mt-4">
      <input
        type="text"
        placeholder="Ime"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border px-2 py-1 rounded"
      />
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
        placeholder="Lozinka"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="border px-2 py-1 rounded"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Registruj se</button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}
    </form>
  );
}