import axiosInstance from "../axiousinstance/axiousinstance";

// Get all users (Admin)
export const getAllUsers = async () => {
  const { data } = await axiosInstance.get("/user/admin");
  console.log(data.results);
  return data.results.users;
};
