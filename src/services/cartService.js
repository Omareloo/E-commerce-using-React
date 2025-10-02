import axiosInstance from '../axiousinstance/axiousinstance';

// Get user cart
export const getUserCart = async () => {
  try {
    const { data } = await axiosInstance.get('/cart');
    return data; // { cart, totalPrice }
  } catch (error) {
    console.error('Error fetching cart:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    return { cart: { items: [] }, totalPrice: 0 };
  }
};

// Add product to cart
export const addToCart = async (productId, quantity = 1) => {
  try {
    const { data } = await axiosInstance.post(`/cart/${productId}`, { quantity });
    return data;
  } catch (error) {
    console.error('Error adding to cart:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw error;
  }
};

// Remove one product from cart
export const removeFromCart = async (productId) => {
  try {
    const { data } = await axiosInstance.delete(`/cart/${productId}`);
    return data;
  } catch (error) {
    console.error('Error removing from cart:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw error;
  }
};

// Clear all cart items
export const clearCart = async () => {
  try {
    const { data } = await axiosInstance.delete('/cart');
    return data;
  } catch (error) {
    console.error('Error clearing cart:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw error;
  }
};

// Update quantity
export const updateCartQuantity = async (productId, quantity) => {
  try {
    const { data } = await axiosInstance.put(`/cart/${productId}`, { quantity });
    return data;
  } catch (error) {
    console.error('Error updating cart quantity:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw error;
  }
};
