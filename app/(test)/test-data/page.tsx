import React from 'react'
import { testAction } from '@/actions/test';
import Link from 'next/link';
import TestDataTable from './components/TestDataList';

// Dodaj ostala polja ako ih ima

const Page = async () => {

  const data = await testAction();

  return (
    <>
      <Link className='text-blue-600 hover:text-amber-900' href="/test-data/add">Dodaj test podatke</Link>
      <TestDataTable podaci={data} />
    </>
  )
}
export default Page;
