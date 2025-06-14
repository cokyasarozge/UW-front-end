import { Claim } from '../components/UW/types'

type statusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type errorType = string | null

export interface ClaimState {
    claims: Claim[];
    fetchStatus: statusType;
    fetchError: errorType;
    postStatus: statusType;
    postError: errorType;
}
  