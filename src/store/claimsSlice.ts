import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ClaimState, ClaimData } from './types'

const initialState: ClaimState = {
  claims: [],
  fetchStatus: 'idle',
  fetchError: null,
  postStatus: 'idle',
  postError: null,
  deleteStatus: 'idle',
  deleteError: null,
  editStatus: 'idle',
  editError: null,
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

// PUT: Edit an existing claim
export const editClaim = createAsyncThunk(
  'claims/editClaim',
  async (updatedClaim: ClaimData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}/claims/${updatedClaim.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedClaim)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update claim');
      }

      return updatedClaim; // return the updated data
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


// DELETE: delete claim
export const deleteClaim = createAsyncThunk(
  'claims/deleteClaim',
  async (claimId: (number | null), { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}/claims/${claimId}`,
        {
          method: 'DELETE'
        }
      )

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to delete claim');
      }

      return claimId; // or await response.json() if API returns something
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    
  }
)

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
      .addCase(submitClaim.fulfilled, (state, action: PayloadAction<ClaimData>) => {
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
      .addCase(fetchClaims.fulfilled, (state, action: PayloadAction<ClaimData[]>) => {
        state.fetchStatus = 'succeeded';
        state.claims = action.payload;
      })
      .addCase(fetchClaims.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.fetchError = action.payload as string;
      });

    // DELETE claim
    builder
      .addCase(deleteClaim.pending, (state) => {
        state.deleteStatus = 'loading';
        state.deleteError = null;
      })
      .addCase(deleteClaim.fulfilled, (state, action: PayloadAction<number | null>) => {
        state.deleteStatus = 'succeeded';
        // delete logic here
        state.claims = state.claims.filter(claim => claim.id !== action.payload);
      })
      .addCase(deleteClaim.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.deleteError = action.payload as string;
      });

      // Edit claim
      builder
      .addCase(editClaim.pending, (state) => {
        state.editStatus = 'loading';
        state.editError = null;
      })
      .addCase(editClaim.fulfilled, (state, action: PayloadAction<ClaimData>) => {
        state.editStatus = 'succeeded';
        const index = state.claims.findIndex(claim => claim.id === action.payload.id);
        if (index !== -1) {
          state.claims[index] = action.payload;
        }
      })
      .addCase(editClaim.rejected, (state, action) => {
        state.editStatus = 'failed';
        state.editError = action.payload as string;
      });
  }
});

export default claimsSlice.reducer;