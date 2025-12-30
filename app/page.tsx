import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import HomeClient from "./HomeClient";

export default async function Page() {
  const session = await getServerSession(authOptions);
  // Only pick serializable fields
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
    <HomeClient lang="en" session={safeSession} />
  );
}

