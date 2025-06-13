
export interface ClaimData {
    date: string;
    category: string;
    description: string;
    id: number | null;
  }
  
type statusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type errorType = string | null

export interface ClaimState {
    claims: ClaimData[];
    fetchStatus: statusType;
    fetchError: errorType;
    postStatus: statusType;
    postError: errorType;
}
  