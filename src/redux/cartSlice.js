// src/redux/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateCartQuantity,
} from '../services/cartService';

// Thunks
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const response = await getUserCart();
    if (!response) return { items: [], totalPrice: 0 };
    return {
      items: response.cart?.items || [],
      totalPrice: response.totalPrice || 0,
    };
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch cart');
  }
});

export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await addToCart(productId, quantity);
      if (!response) return { items: [], totalPrice: 0 };
      return {
        items: response.cart?.items || [],
        totalPrice: response.totalPrice || 0,
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add item to cart');
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (id, { rejectWithValue }) => {
    try {
      await removeFromCart(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to remove item from cart');
    }
  }
);

export const clearCartItems = createAsyncThunk(
  'cart/clearCartItems',
  async (_, { rejectWithValue }) => {
    try {
      await clearCart();
      return { items: [], totalPrice: 0 };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to clear cart');
    }
  }
);

export const updateItemQuantity = createAsyncThunk(
  'cart/updateItemQuantity',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await updateCartQuantity(productId, quantity);
      if (!response) return { items: [], totalPrice: 0 };
      return {
        items: response.cart?.items || [],
        totalPrice: response.totalPrice || 0,
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update quantity');
    }
  }
);

// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add item
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      })
      // Remove item
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const idToRemove = action.payload;
        state.items = state.items.filter((item) => item.productId._id !== idToRemove);
        state.totalPrice = state.items.reduce(
          (sum, item) => sum + (item.productId?.price || 0) * (item.quantity || 1),
          0
        );
      })
      // Clear cart
      .addCase(clearCartItems.fulfilled, (state, action) => {
        state.items = [];
        state.totalPrice = 0;
      })
      // Update quantity
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      });
  },
});

export default cartSlice.reducer;
