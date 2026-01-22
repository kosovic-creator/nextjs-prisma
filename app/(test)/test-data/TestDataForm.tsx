interface TestDataFormProps {
    podaci: { id: number; name: string; value: number | null }[];
}

const TestDataForm = ({ podaci }: TestDataFormProps) => (
    <div>
        {podaci.map(item => (
            <div key={item.id}>
            {item.name} - {item.value !== null ? item.value : ''}
        </div>
    ))}
    </div>
);

export default TestDataForm;