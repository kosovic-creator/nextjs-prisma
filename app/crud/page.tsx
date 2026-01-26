import React from 'react'
import { testAction } from '@/actions/crud';
import SuccessMessage from './components/SuccessMessage';
import TestDataTable from './components/TestDataTable';



export default async function TestDataPage({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {
    const params = await searchParams;
    const successParam = params.success;
    const errorParam = params.error;
    await testAction(); // Ensure data is fresh
    const data = await testAction();
    return (
        <>
            {successParam && (
                <SuccessMessage message={successParam} type="success" />
            )}

            {
                errorParam && (
                    <SuccessMessage message={errorParam} type="error" />
                )
            }


            <TestDataTable podaci={data} />
        </>
    )
}