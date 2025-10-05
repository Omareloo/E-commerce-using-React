import { useState, useEffect } from "react";
import { Container, Typography, Button, Box, Pagination } from "@mui/material";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../../services/productservice";
import ProductTable from "../../../components/DashBoardComp/ProductTable/producttable";
import ProductDialog from "../../../components/DashBoardComp/ProductFormModel/productformmodel";
import { useSelector } from "react-redux";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {content} = useSelector((state) => state.lang);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async (pageNum = 1) => {
    try {
      const fetched = await getProducts(pageNum);
      setProducts(fetched.results);
      setPage(fetched.page);
      setTotalPages(fetched.totalPages);
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
      fetchProducts(page);
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
      await fetchProducts(page); 
      setOpenDialog(false);
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {content.Products}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        sx={{ mb: 4 }}
      >
        {content.AddProduct}      </Button>

      <Box sx={{ mt: 4 }}>
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
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
