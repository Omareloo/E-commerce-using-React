import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axiosInstance from "../../../axiousinstance/axiousinstance";
import CategoryFormModal from "../../../components/DashBoardComp/CategoriesFormModel/categoriesformmodel";
import CategoryTable from "../../../components/DashBoardComp/CategoriesTable.jsx/categoriestable";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // get categories
  const fetchCategories = async () => {
    const res = await axiosInstance.get("/category");
    setCategories(res.data.Categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // add / update category
  const handleSubmit = async (formData, isEdit) => {
    if (isEdit) {
      await axiosInstance.put(`/category/${editData._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      await axiosInstance.post("/category", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
    setOpenModal(false);
    setEditData(null);
    fetchCategories();
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/category/${id}`);
    fetchCategories();
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          setOpenModal(true);
          setEditData(null);
        }}
      >
        Add Category
      </Button>

      <CategoryFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        initialData={editData}
      />

      <CategoryTable
        categories={categories}
        onEdit={(c) => {
          setEditData(c);
          setOpenModal(true);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
}
