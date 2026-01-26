import Link from 'next/link';
import TestDataForm from '../components/TestDataForm';
import { updateTestData, testAction } from '@/actions/crud';

export default async function UpdatePage({ searchParams }: { searchParams: { id: string } }) {
    const id = Number(searchParams.id);
    type TestData = { id: number; name: string; value: string }; // Adjust fields as needed
    const rawTestDataList = await testAction();
    const testDataList: TestData[] = rawTestDataList.map((item: { id: number; name: string; value: number | null }) => ({
        id: item.id,
        name: item.name,
        value: item.value !== null ? String(item.value) : '',
    }));
    const testData = testDataList.find((item) => item.id === id);

    async function handleUpdateTestData(formData: FormData): Promise<void> {
        'use server';
        await updateTestData(formData);
    }

    if (!testData) {
        return <div>Podatak nije pronađen.</div>;
    }

    return (
        <>
            <Link className='text-grey-600 hover:text-blue-900' href="/">Nazad na test podatke</Link>
            <TestDataForm action={handleUpdateTestData} initialData={testData} />
        </>
    );
}
