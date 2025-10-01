import axiosInstance from "../axiousinstance/axiousinstance";
// Get all categories
export const getCategories = async () => {
  const res = await axiosInstance.get("/categories");
  return res.data.Categories;
};

// Add category
export const addCategory = async (data) => {
  const res = await axiosInstance.post("/categories", data);
  return res.data;
};

// Update category
export const updateCategory = async (id, data) => {
  const res = await axiosInstance.put(`/categories/${id}`, data);
  return res.data;
};

// Delete category
export const deleteCategory = async (id) => {
  const res = await axiosInstance.delete(`/categories/${id}`);
  return res.data;
};



// Get all subcategories
export const getSubCategories = async () => {
  const res = await axiosInstance.get("/subcategories");
  return res.data.results;
};

