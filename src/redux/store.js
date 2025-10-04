import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import createOrderReducer from './slices/createOrderSlice';
import langReducer from './slices/langSlice';
  const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    createOrder: createOrderReducer,
    lang: langReducer,
  },
});

export default store;
