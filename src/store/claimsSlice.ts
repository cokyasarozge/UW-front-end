import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface ClaimData {
  claimDate: string;
  category: string;
  description: string;
}

interface ClaimState {
  claims: ClaimData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ClaimState = {
  claims: [],
  status: 'idle',
  error: null
};

// GET: Fetch all claims
export const fetchClaims = createAsyncThunk(
  'claims/fetchClaims',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/claims');
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
  async (formData: ClaimData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/submit-claim', {
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
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitClaim.fulfilled, (state, action: PayloadAction<ClaimData>) => {
        state.status = 'succeeded';
        state.claims.push(action.payload);
      })
      .addCase(submitClaim.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Fetch claims
    builder
      .addCase(fetchClaims.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchClaims.fulfilled, (state, action: PayloadAction<ClaimData[]>) => {
        state.status = 'succeeded';
        state.claims = action.payload;
      })
      .addCase(fetchClaims.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default claimsSlice.reducer;