import { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../../services/productservice";
import ProductTable from "../../../components/DashBoardComp/ProductTable/producttable";
import ProductDialog from "../../../components/DashBoardComp/ProductFormModel/productformmodel";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const fetched = await getProducts();
      setProducts(fetched.results);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleAddClick = () => {
    setSelectedProduct(null);
    setOpenDialog(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSave = async (productData) => {
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct._id, productData);
      } else {
        await addProduct(productData);
      }

      await fetchProducts(); 
      setOpenDialog(false);  
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Products Dashboard
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        sx={{ mb: 4 }}
      >
        Add Product
      </Button>

      <Box sx={{ mt: 4 }}>
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Box>

      <ProductDialog
        open={openDialog}
        onClose={handleDialogClose}
        onSave={handleSave}
        product={selectedProduct}
      />
    </Container>
  );
}
