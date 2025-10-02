import axiosInstance from "../axiousinstance/axiousinstance";

// Get all products
export const getProducts = async (page=1) => {
  const res = await axiosInstance.get(`/products?page=${page}`);
  return res.data; // assuming {results: [...]}
};


// Add new product
export const addProduct = async (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("price", data.price);
  formData.append("description", data.description);
  if (data.image instanceof File) {
    formData.append("image", data.image);
  }
  formData.append("Category", data.Category);
  formData.append("SubCategory", data.SubCategory);

  const res = await axiosInstance.post("/products", formData);
  return res.data;
};

// Update product
export const updateProduct = async (id, data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("price", data.price);
  formData.append("description", data.description);
  if (data.image instanceof File) {
    formData.append("image", data.image);
  }
  formData.append("Category", data.Category);
  formData.append("SubCategory", data.SubCategory);

  await axiosInstance.put(`/products/${id}`, formData);

  // دايماً هات أحدث نسخة بعد التحديث (populated)
  const updated = await axiosInstance.get(`/products/${id}`);
  return { result: updated.data.result };
};

// Delete product
export const deleteProduct = async (id) => {
  const res = await axiosInstance.delete(`/products/${id}`);
  return res.data;
};
