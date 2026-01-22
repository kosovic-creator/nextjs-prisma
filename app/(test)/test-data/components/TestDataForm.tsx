'use client';
import { Input } from '@/components/ui/input';
import React from 'react';

export default function TestDataForm({ action }: { action: (formData: FormData) => Promise<void> }) {
  return (
      <form action={action}>
          <Input name="name"  />
          <Input name="value"  />
          <button type="submit">Pošalji</button>
      </form>
  );
}