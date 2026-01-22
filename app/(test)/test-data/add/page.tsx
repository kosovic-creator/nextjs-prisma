import Link from 'next/link'
import React from 'react'

function AddPage() {
    return (
        <>
            <div className="div">Add Test Data</div>
            <Link className='text-blue-600 hover:text-amber-900' href="/test-data">Nazad na test podatke</Link>
        </>
    )
}

export default AddPage
