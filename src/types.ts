
export interface ClaimData {
    claimDate: string;
    category: string;
    description: string;
    id?: number;
  }
  
export interface ClaimState {
    claims: ClaimData[];
    fetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    fetchError: string | null;
    postStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    postError: string | null;
}
  