import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";

export default async function Page() {
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Session error:", error);
    // Session će ostati null ako ima grešku
  }
  const safeSession = session
    ? {
      user: {
        name: session.user?.name ?? null,
        email: session.user?.email ?? null,
        role: session.user?.role ?? null,
      },
    }
    : null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        NextAuth v7 Demo {safeSession?.user?.email}
        <Button className="ml-4">Client Dugme Chadcn</Button>
      </h1>
      {/* primjer da se ne može Carusel importovati ovde zbog SSR-a, već samo u klijentskim komponentama */}
      {/* <Karusel /> a onda importovati u serverskoj komponenti */}
      {safeSession?.user?.role === "admin" && (
        <div className="mt-4 p-4 bg-green-100 border rounded">
          <b>Admin sekcija:</b> Samo admin vidi ovu poruku!
          <Button className="ml-4">Admin Dugme Chadcn</Button>
        </div>
      )}
    </main>
  );
}

