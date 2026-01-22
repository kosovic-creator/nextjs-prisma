'use client';
import { useState } from 'react';

export default function AddTest() {
  const [result, setResult] = useState(null);

  const handleAdd = async () => {
    const res = await fetch('/api/test-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'New Test Data', value: 42 }),
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div>
      <button onClick={handleAdd}>Add Test Data</button>
      {result && <div>New test data added: {JSON.stringify(result)}</div>}
    </div>
  );
}