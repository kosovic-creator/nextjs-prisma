
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";



  export default async function Page() {
    const session = await getServerSession(authOptions);
    return (
      <>
        <main className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold mb-4">NextAuth v7 Demo {session?.user?.email}</h1>
          {session?.user?.role === "admin" && (
            <div className="mt-4 p-4 bg-green-100 border rounded">
              <b>Admin sekcija:</b> Samo admin vidi ovu poruku!
            </div>
          )}
        </main>
      </>
    );
  }

