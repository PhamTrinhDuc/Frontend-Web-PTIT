import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, post, remove } from "../utils/requests";

// Thunk to fetch wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await get(`wishlist/${userId}`, token);
      if (response.success || response.Success || response.status === "Success") {
        return response.data;
      }
      return rejectWithValue(response.message || "Unknown error");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to add to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ userId, productId }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await post(`wishlist/${userId}/add/${productId}`, {}, token);
      if (response.success || response.Success || response.status === "Success") {
        return response.data;
      }
      return rejectWithValue(response.message || "Unknown error");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to remove from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async ({ userId, productId }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await remove(`wishlist/${userId}/remove/${productId}`, token);
      if (response.success || response.Success || response.status === "Success") {
        return productId;
      }
      return rejectWithValue(response.message || "Unknown error");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        console.log("[Wishlist] Fetch fulfilled payload:", action.payload);
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        console.error("[Wishlist] Fetch rejected:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        console.log("[Wishlist] Add fulfilled payload:", action.payload);
        // Tránh push trùng lặp nếu state đã có (do logic render nhanh)
        const alreadyExists = state.items.some(item => String(item.productId) === String(action.payload.productId));
        if (!alreadyExists) {
          state.items = [...state.items, action.payload];
        }
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        console.log("[Wishlist] Remove fulfilled, ID:", action.payload);
        state.items = state.items.filter((item) => String(item.productId) !== String(action.payload));
      });
  },
});

export default wishlistSlice.reducer;
