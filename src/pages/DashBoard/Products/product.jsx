import { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import ProductDialog from "../../../components/DashBoardComp/ProductFormModel/productformmodel";
import ProductTable from "../../../components/DashBoardComp/ProductTable/producttable";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../../../services/productservice";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Load products on mount
  useEffect(() => {
    (async () => {
      const fetched = await getProducts();
      setProducts(fetched);
    })();
  }, []);

  const handleAddClick = () => {
    setSelectedProduct(null);
    setOpenDialog(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((p) => p._id !== id));
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSave = async (productData) => {
    if (selectedProduct) {
      const updated = await updateProduct(selectedProduct._id, productData);
      setProducts((prev) =>
        prev.map((p) =>
          p._id === selectedProduct._id ? { ...p, ...updated.result } : p
        )
      );
    } else {
      const added = await addProduct(productData);
      setProducts((prev) => [...prev, added.result]);
    }
    setOpenDialog(false);
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
