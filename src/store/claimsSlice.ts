import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ClaimState } from './types'
import { Claim } from '../components/UW/types'

const initialState: ClaimState = {
  claims: [],
  fetchStatus: 'idle',
  fetchError: null,
  postStatus: 'idle',
  postError: null
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
        state.postStatus = 'loading';
        state.postError = null;
      })
      .addCase(submitClaim.fulfilled, (state, action: PayloadAction<Claim>) => {
        state.postStatus = 'succeeded';
        state.claims.push(action.payload);
      })
      .addCase(submitClaim.rejected, (state, action) => {
        state.postStatus = 'failed';
        state.postError = action.payload as string;
      });

    // Fetch claims
    builder
      .addCase(fetchClaims.pending, (state) => {
        state.fetchStatus = 'loading';
        state.fetchError = null;
      })
      .addCase(fetchClaims.fulfilled, (state, action: PayloadAction<Claim[]>) => {
        state.fetchStatus = 'succeeded';
        state.claims = action.payload;
      })
      .addCase(fetchClaims.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.fetchError = action.payload as string;
      });

  }
});

export default claimsSlice.reducer;