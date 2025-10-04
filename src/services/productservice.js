import axiosInstance from "../axiousinstance/axiousinstance";

// /src/services/productservice.js
  export const getProducts = async (page = 1, keyword = "") => {
  let url = `/products?page=${page}`;
  
   if (keyword) {
    url += `&keyword=${encodeURIComponent(keyword)}`;
  }
  const res = await axiosInstance.get(url);
  return res.data; 
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

  const res = await axiosInstance.put(`/products/${id}`, formData);
  return res.data;
};


export const deleteProduct = async (id) => {
  const res = await axiosInstance.delete(`/products/${id}`);
  return res.data;
};
