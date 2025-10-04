import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import createOrderReducer from './slices/createOrderSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    createOrder: createOrderReducer,
  },
});

export default store;
