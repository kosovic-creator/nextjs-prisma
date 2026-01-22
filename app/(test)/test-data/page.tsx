import React from 'react'
import { testAction } from '@/actions/test';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import TestDataTable from './components/TestDataTable';

type TestDataItem = {
  id: number;
  name: string;
  value: number | null;
  // Dodaj ostala polja ako ih ima
};

const Page = async () => {
  try {
    await testAction();

  } catch (error) {
    console.error("Error adding test data:", error);
    redirect('/test-data');
  }
  const data: TestDataItem[] = await testAction();

  return (
    <>
      <Link className='text-blue-600 hover:text-amber-900' href="/test-data/add">Dodaj test podatke</Link>
      <TestDataTable podaci={data} />
    </>
  )
}

export default Page;
