/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { korisnikSchema } from "@/zod-schemas";
import enAuth from '@/i18n/locales/en/auth.json';
import srAuth from '@/i18n/locales/sr/auth.json';
import { useRouter } from 'next/navigation';
// import { signIn, signOut, useSession } from "next-auth/react";

export default function RegisterForm() {
  const router = useRouter(); // Placeholder for router, replace with actual router if needed
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const searchParams = useSearchParams();
  const langParam = searchParams?.get('lang');
  const lang = langParam === 'sr' || langParam === 'en' ? langParam : 'en';
  const messages = lang === 'sr' ? srAuth : enAuth;
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return typeof value === 'string' ? value : key;
  };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setErrors({});

    // Prvo validacija pre slanja na server
    const validationSchema = korisnikSchema(t).pick({
      email: true,
      ime: true,
      lozinka: true
    });

    try {
      validationSchema.parse({
        email,
        ime: name,
        lozinka: password,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach(issue => {
          const path = issue.path[0] as string;
          fieldErrors[path] = issue.message;
        });
        setErrors(fieldErrors);
        setError(t("register.fill_all_fields"));
        return;
      }
    }

    // Ako je validacija uspešna, slanje na server
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await res.json();
    if (data.error) setError(data.error);
    else setSuccess(t("register.register_success"));
    setTimeout(() => {
      router.push(`/auth/prijava?lang=${lang}`);
    }, 3000);

  };

  const validateField = (fieldName: string, value: string) => {
    const validationSchema = korisnikSchema(t).pick({
      email: true,
      ime: true,
      lozinka: true
    });

    try {
      const fieldSchema = validationSchema.shape[fieldName as keyof typeof validationSchema.shape];
      if (!fieldSchema) return;

      fieldSchema.parse(value);

      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const firstError = error.issues[0];
        if (firstError?.message) {
          setErrors(prev => ({ ...prev, [fieldName]: firstError.message }));
        }
      }
    }
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleRegister} className="p-4 border rounded flex flex-col gap-2 max-w-sm w-full">
        <div className="flex justify-between mb-4">
          <span className="font-bold">{t("register.title")}</span>
        </div>
        <div>
          <input
            type="text"
            name="ime"
            placeholder={t("register.name")}
            value={name}
            onBlur={handleBlur}
            onChange={e => setName(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors.ime ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.ime && <p className="text-red-500 text-sm mt-1">{errors.ime}</p>}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onBlur={handleBlur}
            onChange={e => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <input
            type="password"
            name="lozinka"
            placeholder={t("register.password")}
            value={password}
            onBlur={handleBlur}
            onChange={e => setPassword(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors.lozinka ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.lozinka && <p className="text-red-500 text-sm mt-1">{errors.lozinka}</p>}
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">{t("register.submit")}</button>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
      </form>
    </div>
  );
}