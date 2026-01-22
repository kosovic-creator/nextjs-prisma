import React from 'react'
import { testAction } from '@/actions/test';
import TestDataForm from './TestDataForm';

type TestDataItem = {
  id: number;
  name: string;
  value: number | null;
  // Dodaj ostala polja ako ih ima
};

const Page = async () => {
  const data: TestDataItem[] = await testAction();
  console.log("Test data:", data);
  return (
    <>

      <TestDataForm podaci={data} />
    </>
  )
}

export default Page;
