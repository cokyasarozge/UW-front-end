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
    formLabel: string;
}

export const formComponents : FormComponent[] = [
    {type: 'date', name: 'date', formLabel: 'Claim date'},
    {type: 'select', name: 'category', formLabel: 'Category'},
    {type: 'text', name: 'description', formLabel: 'Description'}
]

export const categories = [
    'Personal injury', 
    'Travel', 
    'Car', 
    'Property damage', 
    'Liability claims',
    'Financial losses'
] as const;