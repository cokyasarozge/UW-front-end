export interface Claim {
    date: string;
    category: string;
    description: string;
    id: number | null;
}

export interface Error {
    date: boolean;
    category: boolean;
    description: boolean;
}

type inputType = 'date' | 'select' | 'text'

export interface FormComponent {
    type: inputType;
    name: string;
    inputLabel: string;
}

export const formComponents : FormComponent[] = [
    {type: 'date', name: 'date', inputLabel: 'Claim date'},
    {type: 'select', name: 'category', inputLabel: 'Category'},
    {type: 'text', name: 'description', inputLabel: 'Description'}
]

export const categories = [
    'Personal injury', 
    'Travel', 
    'Car', 
    'Property damage', 
    'Liability claims',
    'Financial losses'
] as const;