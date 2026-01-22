'use client';
import { Input } from '@/components/ui/input';
import React from 'react';

export default function TestDataForm({ action }: { action: (formData: FormData) => Promise<void> }) {
    return (
        <form action={action}>
            <div className="gap-2 flex flex-col max-w-md mt-4">
                <Input placeholder='ime' name="name" />
                <Input placeholder='broj' name="value" />
                <button type="submit">Pošalji</button>
            </div>

        </form>
    );
}