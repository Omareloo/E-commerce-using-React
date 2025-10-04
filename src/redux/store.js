import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './slices/wishlistSlice';
import cartReducer from './slices/cartSlice';
import createOrderReducer from './slices/createOrderSlice';
const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    createOrder: createOrderReducer,
  },
});

export default store;
