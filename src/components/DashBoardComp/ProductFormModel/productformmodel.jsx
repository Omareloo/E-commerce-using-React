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
  FormHelperText,
} from "@mui/material";
import { getCategories, getSubCategories } from "../../../services/categoryservice";
import { useSelector } from "react-redux";

const ProductDialog = ({ open, onClose, onSave, product }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: null,
    description: "",
    Category: "",
    SubCategory: "",
  });

  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const { content } = useSelector((state) => state.lang);

  useEffect(() => {
    (async () => {
      setCategories(await getCategories());
      setSubcategories(await getSubCategories());
    })();
  }, []);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        price: product.price || "",
        image: product.image || null,
        description: product.description || "",
        Category: product.Category?._id || "",
        SubCategory: product.SubCategory?._id || "",
      });
    } else {
      setFormData({
        title: "",
        price: "",
        image: null,
        description: "",
        Category: "",
        SubCategory: "",
      });
      setErrors({});
    }
  }, [product, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); 
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setErrors({ ...errors, image: "" });
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    else if (formData.title.length < 2) newErrors.title = "Title is too short";

    if (!formData.price || formData.price <= 0) newErrors.price = "Price must be greater than 0";

    if (!formData.description.trim()) newErrors.description = "Description is required";
    else if (formData.description.length < 5)
      newErrors.description = "Description is too short (min 5 chars)";

    if (!formData.Category) newErrors.Category = "Category is required";
    if (!formData.SubCategory) newErrors.SubCategory = "SubCategory is required";

    if (!formData.image || formData.image === null) {
      newErrors.image = "Product image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{product ? content.EditProduct : content.AddProduct}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ py: 3 }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label={content.Title}
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
            />

            <TextField
              fullWidth
              label={content.Price}
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              error={!!errors.price}
              helperText={errors.price}
            />

            <Box>
              <TextField
                fullWidth
                type="file"
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: "image/*" }}
                onChange={handleFileChange}
                error={!!errors.image}
                helperText={errors.image}
              />

              {formData.image && !(formData.image instanceof File) && (
                <img
                  src={`http://localhost:3000/uploads/products/${formData.image}`}
                  alt="preview"
                  style={{
                    width: "100px",
                    marginTop: "10px",
                    borderRadius: "8px",
                  }}
                />
              )}
            </Box>

            <TextField
              fullWidth
              label={content.Description}
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
            />

            <FormControl fullWidth error={!!errors.Category}>
              <InputLabel>{content.Category}</InputLabel>
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
              {errors.Category && <FormHelperText>{errors.Category}</FormHelperText>}
            </FormControl>

            <FormControl fullWidth error={!!errors.SubCategory}>
              <InputLabel>{content.SubCategory}</InputLabel>
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
              {errors.SubCategory && (
                <FormHelperText>{errors.SubCategory}</FormHelperText>
              )}
            </FormControl>
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          {content.Cancel}
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {content.Save}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
