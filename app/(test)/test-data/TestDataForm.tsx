import React from 'react';

type TestDataItem = {
    id: number;
    name: string;
    value: number | null;
    // Dodaj ostala polja ako ih ima
};

type Props = {
    podaci: TestDataItem[];
};

const TestDataForm: React.FC<Props> = ({ podaci }) => {
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
