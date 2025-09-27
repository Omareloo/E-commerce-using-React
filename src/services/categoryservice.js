import axiosInstance from "../axiousinstance/axiousinstance";

export const getCategories = () => axiosInstance.get("/Categories");
export const addCategory = (data) => axiosInstance.post("/Categories", data);
export const updateCategory = (id, data) => axiosInstance.put(`/Categories/${id}`, data);
export const deleteCategory = (id) => axiosInstance.delete(`/Categories/${id}`);
