import axiosInstance from '../axiousinstance/axiousinstance';

// Get wishlist
export const getWishlist = async () => {
  try {
    const response = await axiosInstance.get('/wishlist');
    return { data: { wishlist: { items: response.data?.wishlist?.items || [] } } };
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return { data: { wishlist: { items: [] } } };
  }
};

// Add to wishlist
export const addWishlistItem = async (productId) => {
  try {
    const response = await axiosInstance.post(`/wishlist/${productId}`);
    return { data: { wishlist: { items: response.data?.wishlist?.items || [] } } };
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

// Remove from wishlist
export const removeWishlistItem = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/wishlist/${productId}`);
    return { data: { wishlist: { items: response.data?.wishlist?.items || [] } } };
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

// Clear wishlist
export const clearWishlistItems = async () => {
  try {
    const response = await axiosInstance.delete('/wishlist');
    return { data: { wishlist: { items: response.data?.wishlist?.items || [] } } };
  } catch (error) {
    console.error('Error clearing wishlist:', error);
    throw error;
  }
};
