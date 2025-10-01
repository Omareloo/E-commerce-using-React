import axiosInstance from "../axiousinstance/axiousinstance";

// Get all users (Admin)
export const getAllUsers = async () => {
  const { data } = await axiosInstance.get("/user/admin");
  return data.users;
};
