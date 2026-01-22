import { redirect } from 'next/navigation';
import prisma from "@/lib/prisma";
import { request } from "https";

export async function testAction() {
  // Dummy fetch

  await fetch('https://example.com', { cache: 'no-store' });

  const test_data = await prisma.testModel.findMany();
  return test_data;
}
export async function addTestData(formData: FormData): Promise<void> {
  // Pristupi ne-keširanim podacima
  await fetch('https://example.com', { cache: 'no-store' });

  await prisma.testModel.create({
    data: {
      name: formData.get('name') as string,
      value: formData.get('value') ? Number(formData.get('value')) : null,
    },
  });

  redirect('/test-data'); // Ovdje radiš redirect
}
