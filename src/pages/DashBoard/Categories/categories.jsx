import { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import CategoryTable from "../../../components/DashBoardComp/CategoriesTable.jsx/categoriestable";
import CategoryDialog from "../../../components/DashBoardComp/CategoriesFormModel/categoriesformmodel";
import { getCategories, addCategory, updateCategory, deleteCategory } from "../../../services/categoryservice";
import { useSelector } from "react-redux";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false); 
    const { content } = useSelector((state) => state.lang);


  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const cats = await getCategories();
        setCategories(cats || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const handleAddClick = () => {
    setSelectedCategory(null);
    setOpenDialog(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteCategory(id);
      setCategories(categories.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Failed to delete category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedCategory(null);
  };

  const handleSave = async (categoryData) => {
    console.log("Saving category data:", categoryData);
    setLoading(true);
    try {
      let updatedCategories = [...categories];
      if (selectedCategory) {
        const response = await updateCategory(selectedCategory._id, categoryData);
        console.log("Update response:", response);
        if (response && response.data) {
          updatedCategories = categories.map((c) =>
            c._id === selectedCategory._id ? { ...c, ...response.data } : c
          );
        } else {
          updatedCategories = categories.map((c) =>
            c._id === selectedCategory._id ? { ...c, ...categoryData } : c
          );
        }
      } else {
        const response = await addCategory(categoryData);
        console.log("Add response:", response);
        if (response && response.data && response.data.name) {
          updatedCategories = [...categories, response.data];
        } else {
          const newId = Date.now().toString();
          updatedCategories = [...categories, { ...categoryData, _id: newId }];
        }
      }
      setCategories(updatedCategories);
      setOpenDialog(false);
    } catch (error) {
      console.error("Full error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      try {
        const cats = await getCategories();
        setCategories(cats || []);
      } catch (fetchError) {
        console.error("Fallback fetch failed:", fetchError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        {content.Categories}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        disabled={loading}
        sx={{ mb: 6 }}
      >
        {loading ? content.Loading : content.AddCategory}
      </Button>
      <Box sx={{ mt: 6 }}>
        <CategoryTable
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Box>
      <CategoryDialog
        open={openDialog}
        onClose={handleDialogClose}
        onSave={handleSave}
        category={selectedCategory}
        loading={loading}
      />
    </Container>
  );
}