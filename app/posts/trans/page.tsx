import { serverActionTransaction } from '@/actions/post';
import Link from 'next/link';
import React from 'react'

function TrensPage() {
    async function transAction() {

      "use server";
     await serverActionTransaction();
    }

  return (

<>
<div>
    <button onClick={transAction} className="bg-blue-500 text-white px-4 py-2 rounded">Start Transaction</button>
  <Link href="/posts" className="ml-4 bg-green-500 text-white px-4 py-2 rounded">Back to Posts nextauth redirect</Link>
<Link href="/posts/trans" className="ml-4 bg-green-500 text-white px-4 py-2 rounded">Back to Home nextauth rewrite</Link>
    </div>
</>
  )
}

export default TrensPage
