interface TestDataFormProps {
    podaci: { id: string; name: string; value: string }[];
}

const TestDataForm = ({ podaci }: TestDataFormProps) => {
    return (
        <div>
            {podaci.map(item => (
                <div key={item.id}>
                    {item.name} - {item.value}
                </div>
            ))}
        </div>
    );
};
export default TestDataForm;