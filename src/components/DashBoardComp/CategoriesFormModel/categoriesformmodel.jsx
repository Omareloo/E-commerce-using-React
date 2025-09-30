import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";

const CategoryDialog = ({ open, onClose, onSave, category }) => {
  const [formData, setFormData] = useState({ name: "" });

  useEffect(() => {
    if (category) {
      setFormData({ ...category });
    } else {
      setFormData({ name: "" });
    }
  }, [category]);

  const handleChange = (e) => {
    setFormData({ name: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{category ? "Edit Category" : "Add Category"}</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ py: 2 }}>
          <TextField
            fullWidth
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Stack>
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

export default CategoryDialog;
