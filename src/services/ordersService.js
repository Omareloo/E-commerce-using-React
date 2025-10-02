import axiosInstance from "../axiousinstance/axiousinstance";

// Get all orders (Admin)
export const getAllAdminOrders = async () => {
  const { data } = await axiosInstance.get("/order/admin");
  return data.orders;
};

// Update order status (Admin)
export const updateOrderStatus = async (orderId, status) => {
  const { data } = await axiosInstance.put(`/order/admin/${orderId}`, { status });
  return data.order;
};
