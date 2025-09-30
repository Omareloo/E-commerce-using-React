import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Stack
} from '@mui/material';

const ProductDialog = ({ open, onClose, onSave, product }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    image: null,
    description: '',
    Catergory: '',
    SubCatergory: '',
    slug: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        image: product.image instanceof File ? product.image : null,
      });
    } else {
      setFormData({
        title: '',
        price: 0,
        image: null,
        description: '',
        Catergory: '',
        SubCatergory: '',
        slug: '',
      });
    }
  }, [product]);

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
      <DialogTitle>{product ? 'Edit Product' : 'Add Product'}</DialogTitle>
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
        label="Image"
        type="file"
        InputLabelProps={{ shrink: true }}
        inputProps={{ accept: "image/*" }}
        onChange={handleFileChange}
      />
      {formData.image && (
        <Box>
          {formData.image instanceof File
            ? formData.image.name
            : formData.image || "No image selected"}
        </Box>
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
      <TextField
        fullWidth
        label="Category ID"
        name="Catergory"
        value={formData.Catergory}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="SubCategory ID"
        name="SubCatergory"
        value={formData.SubCatergory}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Slug"
        name="slug"
        value={formData.slug}
        onChange={handleChange}
      />
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