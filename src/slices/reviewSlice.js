import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, post } from '../utils/requests';

// Fetch reviews for a product
export const fetchReviewsByProductId = createAsyncThunk(
  'reviews/fetchByProductId',
  async ({ productId, page = 0, size = 5 }, { rejectWithValue }) => {
    try {
      const response = await get(`reviews/product/${productId}?page=${page}&size=${size}`);
      if (response && response.status) {
        return response.data;
      }
      return rejectWithValue(response?.message || 'Failed to fetch reviews');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Submit a review
export const submitReview = createAsyncThunk(
  'reviews/submit',
  async ({ reviewData, userId }, { rejectWithValue }) => {
    try {
      const response = await post(`reviews?userId=${userId}`, reviewData);
      if (response && response.status) {
        return response.data;
      }
      return rejectWithValue(response?.message || 'Failed to submit review');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch summary for reviews
export const fetchReviewSummary = createAsyncThunk(
  'reviews/fetchSummary',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await get(`reviews/product/${productId}/summary`);
      if (response && response.status) {
        return response.data;
      }
      return rejectWithValue(response?.message || 'Failed to fetch summary');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    items: [],
    summary: {
      averageRating: 0,
      totalReviews: 0,
    },
    loading: false,
    submitting: false,
    error: null,
    pagination: {
      currentPage: 0,
      totalPages: 0,
    },
  },
  reducers: {
    clearReviewError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch reviews
      .addCase(fetchReviewsByProductId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviewsByProductId.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.content;
        state.pagination = {
          currentPage: action.payload.number,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(fetchReviewsByProductId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Submit review
      .addCase(submitReview.pending, (state) => {
        state.submitting = true;
      })
      .addCase(submitReview.fulfilled, (state) => {
        state.submitting = false;
        state.error = null;
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })
      // Fetch summary
      .addCase(fetchReviewSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      });
  },
});

export const { clearReviewError } = reviewSlice.actions;
export default reviewSlice.reducer;
