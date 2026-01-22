interface TestDataFormProps {
    podaci: { id: number; name: string; value: number | null }[];
}

const TestDataForm = ({ podaci }: TestDataFormProps) => (
    <div>
        <table className="table-auto border border-gray-300 mb-2">
            <thead>
                <tr>
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Value</th>
                </tr>
            </thead>
            <tbody>
                {podaci.map(item => (
                    <tr key={item.id}>
                        <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.value !== null ? item.value : ''}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default TestDataForm;