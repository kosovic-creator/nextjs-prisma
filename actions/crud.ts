'use server';
import { redirect } from 'next/navigation';
import prisma from "@/lib/prisma";
import { revalidatePath } from 'next/cache';

export async function testAction() {

  await fetch('https://example.com', { cache: 'no-store' }); // workaround

  const podaci = await prisma.testModel.findMany();
 
  return podaci;
  
}

export async function addTestData(formData: FormData) {

  await prisma.testModel.create({
    data: {
      name: formData.get('name') as string,
      value: formData.get('value') ? Number(formData.get('value')) : null,
    },
  });
if (isNaN(Number(formData.get('value')))) {
    revalidatePath('/crud');
  const params = new URLSearchParams();
  params.append('error', 'Mora biti broj');
  redirect(`/crud?${params.toString()}`);
  }
  revalidatePath('/crud');
  const params = new URLSearchParams();
  params.append('success', 'Zapis je dodat');
  redirect(`/crud?${params.toString()}`);

}
export async function updateTestData(formData: FormData) {
  const id = Number(formData.get('id'));
  await prisma.testModel.update({
    where: { id },
    data: {
      name: formData.get('name') as string,
      value: formData.get('value') ? Number(formData.get('value')) : null,
    },
  });
if (isNaN(Number(formData.get('value')))) {
    revalidatePath('/crud');
  const params = new URLSearchParams();
  params.append('error', 'Mora biti broj');
  redirect(`/crud?${params.toString()}`);
  }
  if ((Number(formData.get('name')))) {
    revalidatePath('/crud');
  const params = new URLSearchParams();
  params.append('error', 'Mora biti Karakter');
  redirect(`/crud?${params.toString()}`);
  }
  revalidatePath('/crud');
  const params = new URLSearchParams();
  params.append('success', 'Zapis je ažuriran');
  redirect(`/crud?${params.toString()}`);

}



export async function deleteTestData(formData: FormData) {
  const id = Number(formData.get('id'));
  await prisma.testModel.delete({
    where: { id },
  });

  revalidatePath('/crud');
  const params = new URLSearchParams();
  params.append('success', 'Zapis je obrisan');
  redirect(`/crud?${params.toString()}`);

}

// interface TestActionByIdParams {
//   id: number;
// }

export async function testActionById(searchParams: { id: number }) {
  const id = Number(searchParams.id);
  if (isNaN(id)) return null; // ili baci grešku
  return await prisma.testModel.findUnique({ where: { id } });
}