import { Claim } from '../components/UW/types'

export interface Status {
    error: string | null;
    fulfilled: boolean;
    isLoading: boolean;
}

export interface ClaimState {
    claims: Claim[];
    fetchStatus: Status;
    postStatus: Status;
}
  