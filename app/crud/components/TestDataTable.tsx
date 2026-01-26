'use client';
import React from 'react';
import {  deleteTestData } from "@/actions/crud";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";
import Link from "next/link";

// Add this interface to define the prop type
interface TestDataListProps {
  podaci: Array<{ id: number; name: string; value: number | null }>;
}

const TestDataLTable: React.FC<TestDataListProps> = ({ podaci }) => {
  // Use 'podaci' as needed in your component
  return (
    <div>
      <Link href="/crud/add" className="mb-4 inline-block text-grey-600 hover:text-blue-900 underline">Dodaj</Link>
      <Table >
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Value</th>
            <th className="border px-4 py-2">Akcija</th>
          </tr>
        </thead>
        <tbody>
          {podaci.map((item: { id: number; name: string; value: number | null }) => (
            <tr key={item.id}>

              <td className="border px-4 py-2 text-center">{item.id}</td>
              <td className="border px-4 py-2 text-center">{item.name}</td>
              <td className="border px-4 py-2 text-center">{item.value ?? ''}</td>
              <td className="border px-4 py-2">
                <div className="flex space-x-2 flex-row justify-center">
                  <form action={deleteTestData}>
                    <Input type="hidden" name="id" value={item.id} />
                    <Button variant="ghost" type="submit" className="text-red-600 cursor-pointer" >Obriši</Button>
                  </form>
                  <Link href={`/crud/edit?id=${item.id}`}>
                    <Button variant="ghost" type="button" className="text-green-600 cursor-pointer">Detalji</Button>
                  </Link>

                </div>

              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TestDataLTable;