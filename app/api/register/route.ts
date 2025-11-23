import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email i lozinka su obavezni." }, { status: 400 });
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Korisnik već postoji." }, { status: 409 });
  }
  const user = await prisma.user.create({
    data: {
      email,
      password,
      name,
      role: "user",
    },
  });
  return NextResponse.json({ success: true, user });
}
