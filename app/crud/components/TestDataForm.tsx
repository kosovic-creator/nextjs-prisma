'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


// Define the TestData type
type TestData = { id: number; name: string; value: string };
// Define the props for the TestDataForm component
interface TestDataFormProps {
    action: (formData: FormData) => Promise<void>;
    initialData?: Partial<TestData>;
    mode?: 'add' | 'edit';
   
}
// The TestDataForm component
export default function TestDataForm({
    // Destructure the props
    action,
    initialData,
    mode,
   
}: TestDataFormProps) {
    // const [errors, setErrors] = useState<Record<string, string>>({});

    return (
        <>
        {/* {errors.general && (
            <div className="mb-4 text-red-600">{errors.general}</div>
        )} */}
        {/* The form element that uses the action prop as its submit handler */}
         <form action={action}>
            <div className="gap-2 flex flex-col max-w-md mt-4">
                <input type="hidden" name="id" value={initialData?.id ?? 0} />
                <Input placeholder='ime' name="name" defaultValue={initialData?.name} />
                <Input placeholder='broj' name="value" defaultValue={initialData?.value} />
                <Button variant="default" type="submit">{mode === 'edit' ? 'Promijeni' : 'Dodaj'}</Button>
            </div>
        </form>
        </>
       
    );
}