import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      <div className="flex gap-6 items-center">
        <Link href="/" className="font-bold text-lg">Home</Link>
        <Link href="/posts/trans" className="hover:underline">PostsTrans</Link>
        <Link href="/posts" className="hover:underline">Posts</Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link href="/auth/prijava" className="hover:underline">Prijava</Link>
        <Link href="/auth/register" className="hover:underline">Registracija</Link>
        <form action="/api/auth/signout" method="post">
          <button type="submit" className="hover:underline bg-red-600 px-3 py-1 rounded">Odjava</button>
        </form>
      </div>
    </nav>
  );
}
