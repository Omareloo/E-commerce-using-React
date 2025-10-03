import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getWishlist,
  addWishlistItem,
  removeWishlistItem,
  clearWishlistItems,
} from '../../services/wishlistService';

// thunks
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getWishlist();
      if (!response || !response.data) {
        return [];
      }
      return response.data.wishlist?.items || [];
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch wishlist');
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await addWishlistItem(productId);
      if (!response || !response.data) {
        return [];
      }
      return response.data.wishlist?.items || [];
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add item to wishlist');
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (id, { rejectWithValue }) => {
    try {
      await removeWishlistItem(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to remove item from wishlist');
    }
  }
);

export const clearWishlist = createAsyncThunk(
  'wishlist/clearWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await clearWishlistItems();
      if (!response || !response.data) {
        return [];
      }
      return response.data.wishlist?.items || [];
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to clear wishlist');
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
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
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        const idToRemove = action.payload;
        state.items = state.items.filter((item) => item.productId._id !== idToRemove);
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(clearWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(clearWishlist.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
