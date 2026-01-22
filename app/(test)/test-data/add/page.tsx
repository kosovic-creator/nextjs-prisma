import Link from 'next/link'
import TestDataForm from '../components/TestDataForm'
import { addTestData } from '@/actions/test';

export default function AddPage() {
    // Server Action must be async and have 'use server' inside
    const handleAddTestData = async (formData: FormData): Promise<void> => {
        'use server'
        await addTestData(formData);
    };
    return (
        <>
            <Link className='text-blue-600 hover:text-blue-900' href="/test-data">Nazad na test podatke</Link>
            <TestDataForm action={handleAddTestData} />
        </>
    );
}


