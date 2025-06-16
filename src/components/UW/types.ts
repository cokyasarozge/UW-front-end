export interface Claim {
  id: number;
  description: string;
  date: string;
  category: string;
}

export const categories = [
  'Home',
  'Finance',
  'Tech',
  'travel'
] as const;