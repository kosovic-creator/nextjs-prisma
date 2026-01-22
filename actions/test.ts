import prisma from "@/lib/prisma";
import { request } from "https";

export async function testAction() {
  // Dummy fetch

  await fetch('https://example.com', { cache: 'no-store' });

  const test_data = await prisma.testModel.findMany();
  return test_data;
}
export async function Add(name: string, value: number | null) {
  // Pristupi ne-keširanim podacima
  await fetch('https://example.com', { cache: 'no-store' });

  const newData = await prisma.testModel.create({
    data: {
      name,
      value,
    },
  });
  return newData;
}
