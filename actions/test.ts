import { redirect } from 'next/navigation';
import prisma from "@/lib/prisma";

export async function testAction() {
  await fetch('https://example.com', { cache: 'no-store' }); // workaround

  const test_data = await prisma.testModel.findMany();
  return test_data;
}
export async function addTestData(formData: FormData): Promise<void> {

  await prisma.testModel.create({
    data: {
      name: formData.get('name') as string,
      value: formData.get('value') ? Number(formData.get('value')) : null,
    },
  });

  redirect('/test-data');

}
