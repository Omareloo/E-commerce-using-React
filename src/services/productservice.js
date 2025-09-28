import axiosInstance from "../axiousinstance/axiousinstance";

export const getProducts = async () => {
  try {
    const { data } = await axiosInstance.get("/Products");
    return data.results || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const addProduct = async (product) => {
  try {
    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    const { data } = await axiosInstance.post("/Products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const updateProduct = async (id, product) => {
  try {
    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    const { data } = await axiosInstance.put(`/Products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/Products/${id}`);
    return data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
