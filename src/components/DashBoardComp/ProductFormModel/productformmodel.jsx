import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { getCategories, getSubCategories } from "../../../services/categoryservice";

const ProductDialog = ({ open, onClose, onSave, product }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    image: null,
    description: "",
    Category: "",
    SubCategory: "",
  });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    (async () => {
      setCategories(await getCategories());
      setSubcategories(await getSubCategories());
    })();
  }, []);

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        Category: product.Category?._id || "",
        SubCategory: product.SubCategory?._id || "",
        image: product.image || null,
      });
    } else {
      setFormData({
        title: "",
        price: 0,
        image: null,
        description: "",
        Category: "",
        SubCategory: "",
      });
    }
  }, [product, open]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ py: 3 }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              type="file"
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: "image/*" }}
              onChange={handleFileChange}
            />

            {formData.image && !(formData.image instanceof File) && (
              <img
                src={`http://localhost:3000/uploads/products/${formData.image}`}
                alt="preview"
                style={{ width: "100px", marginTop: "10px", borderRadius: "8px" }}
              />
            )}

            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="Category"
                value={formData.Category}
                onChange={handleChange}
              >
                {categories.map((c) => (
                  <MenuItem key={c._id} value={c._id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>SubCategory</InputLabel>
              <Select
                name="SubCategory"
                value={formData.SubCategory}
                onChange={handleChange}
              >
                {subcategories.map((s) => (
                  <MenuItem key={s._id} value={s._id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
