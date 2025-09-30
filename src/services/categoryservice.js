// services/categoryService.js
import axiosInstance from "../axiousinstance/axiousinstance";
export const getCategories = async () => {
  try {
    const { data } = await axiosInstance.get("/Categories");
    return data.Categories; // array of categories
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const addCategory = async (category) => {
  try {
    const { data } = await axiosInstance.post("/Categories", category);
    return data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

export const updateCategory = async (id, category) => {
  try {
    const { data } = await axiosInstance.put(`/Categories/${id}`, category);
    return data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/Categories/${id}`);
    return data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
