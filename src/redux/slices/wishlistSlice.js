import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getWishlist,
  addWishlistItem,
  removeWishlistItem,
  clearWishlistItems,
} from '../../services/wishlistService';

//  Fetch wishlist
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const items = await getWishlist();
      return items;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch wishlist');
    }
  }
);

//  Add to wishlist
export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const items = await addWishlistItem(productId);
      return items;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add item to wishlist');
    }
  }
);

//  Remove from wishlist
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

//  Clear wishlist
export const clearWishlist = createAsyncThunk(
  'wishlist/clearWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const items = await clearWishlistItems();
      return items;
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
      //  Fetch
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

      //  Add
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.error = action.payload;
      })

      //  Remove
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        const idToRemove = action.payload;
        state.items = state.items.filter((item) => item.productId._id !== idToRemove);
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.error = action.payload;
      })

      //  Clear
      .addCase(clearWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(clearWishlist.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
