import axiosInstance from '../axiousinstance/axiousinstance';

export const createOrderService = async (orderData) => {
  try {
    const response = await axiosInstance.post('/order/user', {
      shippingAddress: orderData.shippingAddress,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};
