import { serverActionTransaction } from '@/actions/post';
import React from 'react'

function TrensPage() {
    async function transAction() {

      "use server";
     await serverActionTransaction();
    }

  return (
    <div>
<>
    <button onClick={transAction} className="bg-blue-500 text-white px-4 py-2 rounded">Start Transaction</button>
    </>
    </div>
  )
}

export default TrensPage
