import { Table } from "@/components/ui/table";

interface TestDataListProps {
    podaci: { id: number; name: string; value: number | null }[];
}

const TestDataList = ({ podaci }: TestDataListProps) => (
    <div>
        <Table>
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
        </Table>
    </div>
);

export default TestDataList;