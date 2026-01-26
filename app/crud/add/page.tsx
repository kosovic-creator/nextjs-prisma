import Link from 'next/link'
import TestDataForm from '../components/TestDataForm'
import { addTestData } from '@/actions/crud';


export default function AddPage() {
    return (
        <>
            {/* direktno šalje funkciju iz server action kao prop u form komponentu */}
            <Link className='text-grey-600 hover:text-blue-900' href="/">Nazad na test podatke</Link>
            <TestDataForm action={addTestData} mode="add" />
        </>
    );
}


