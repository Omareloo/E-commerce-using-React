import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrderService } from '../services/createOrderService';

// thunk
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await createOrderService(orderData);
      return response.order;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create order');
    }
  }
);

const createOrderSlice = createSlice({
  name: 'order',
  initialState: {
    currentOrder: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default createOrderSlice.reducer;
