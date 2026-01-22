import prisma from "@/lib/prisma";

export async function testAction() {
  // Dummy fetch
  await fetch('https://example.com', { cache: 'no-store' });

  const test_data = await prisma.testModel.findMany();
  return test_data;
}