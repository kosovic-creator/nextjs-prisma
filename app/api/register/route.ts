import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  // Provjeri da li korisnik već postoji...

  // Heširaj password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Sačuvaj korisnika s heširanim passwordom
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ user });
}
