"use client";

import ClientLayout from "./components/ClientLayout";


type HomeClientProps = {
  lang: string;
  session: {
    user?: {
      email?: string;
      role?: string;
    };
  } | null;
};

export default function HomeClient({ lang, session }: HomeClientProps) {
  return (
    <ClientLayout lang={lang}>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">
          NextAuth v7 Demo {session?.user?.email}
        </h1>
        {/* <Karusel /> */}
        {session?.user?.role === "admin" && (
          <div className="mt-4 p-4 bg-green-100 border rounded">
            <b>Admin sekcija:</b> Samo admin vidi ovu poruku!
          </div>
        )}
      </main>
    </ClientLayout>
  );
}