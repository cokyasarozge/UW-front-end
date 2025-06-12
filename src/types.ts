export interface formData {
	claimDate: string;
	category: string;
	description: string;
}

export interface ClaimData {
    claimDate: string;
    category: string;
    description: string;
  }
  
export interface ClaimState {
    claims: ClaimData[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
  