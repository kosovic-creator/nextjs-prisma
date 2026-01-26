import Link from 'next/link'
import TestDataForm from '../components/TestDataForm'
import { testActionById } from '@/actions/crud';
import { updateTestData } from '@/actions/crud';// prilagodi putanju ako treba

export default async function IdPage({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {
    const resolvedParams = await searchParams;
    const id = Number(resolvedParams.id);

    if (!id || isNaN(id)) {
        return <div>Neispravan ID parametar.</div>;
    }

    const testData = await testActionById({ id });

    if (!testData) {
        return <div>Podatak nije pronađen.</div>;
    }

    return (
        <>
            <Link className='text-grey-600 hover:text-blue-900' href="/">Nazad na test podatke</Link>
            <TestDataForm
                action={updateTestData}
                initialData={{
                    ...testData,
                    value: testData.value !== null ? String(testData.value) : ''
                }}
                mode="edit"
            />
        </>
    );
}