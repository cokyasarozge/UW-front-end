import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ClaimState } from './types'
import { Claim } from '../components/UW/types'

const initialStatus = {
  error: null,
  fulfilled: false,
  isLoading: false
}

const initialState: ClaimState = {
  claims: [],
  fetchStatus: initialStatus,
  postStatus: initialStatus
};

const URL = "http://localhost:3001" // backend url

// GET: Fetch all claims
export const fetchClaims = createAsyncThunk(
  'claims/fetchClaims',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}/claims`);
      if (!response.ok) throw new Error('Failed to fetch claims');
      const data = await response.json();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);


// POST: Submit a new claim
export const submitClaim = createAsyncThunk(
  'claims/submitClaim',
  async (formData: Claim, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}/submit-claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to submit claim');
      }

      return await response.json();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);


const claimsSlice = createSlice({
  name: 'claims',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Submit claim
    builder
      .addCase(submitClaim.pending, (state) => {
        state.postStatus.isLoading = true;
        state.postStatus.error = null;
      })
      .addCase(submitClaim.fulfilled, (state, action: PayloadAction<Claim>) => {
        state.postStatus.fulfilled = true;
        state.postStatus.isLoading = false;
        state.claims.push(action.payload);
      })
      .addCase(submitClaim.rejected, (state, action) => {
        state.postStatus.isLoading = false;
        state.postStatus.error = action.payload as string;
      });

    // Fetch claims
    builder
      .addCase(fetchClaims.pending, (state) => {
        state.fetchStatus.isLoading = true;
        state.fetchStatus.error = null;
      })
      .addCase(fetchClaims.fulfilled, (state, action: PayloadAction<Claim[]>) => {
        state.fetchStatus.fulfilled = true;
        state.fetchStatus.isLoading = false;
        state.claims = action.payload;
      })
      .addCase(fetchClaims.rejected, (state, action) => {
        state.postStatus.isLoading = false;
        state.fetchStatus.error = action.payload as string;
      });

  }
});

export default claimsSlice.reducer;