import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Grid, MenuItem
} from "@mui/material";

export default function ProductFormModel({ open, onClose, onSubmit, categories, subCategories, initialData }) {
  const isEdit = Boolean(initialData);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{isEdit ? "Edit Product" : "Add Product"}</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField label="Title" name="title" fullWidth defaultValue={initialData?.title} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Price" name="price" type="number" fullWidth defaultValue={initialData?.price} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Image URL" name="image" fullWidth defaultValue={initialData?.image} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Slug" name="slug" fullWidth defaultValue={initialData?.slug} required />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={3}
                defaultValue={initialData?.description}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField select label="Category" name="Catergory" fullWidth defaultValue={initialData?.Catergory} required>
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField select label="SubCategory" name="SubCatergory" fullWidth defaultValue={initialData?.SubCatergory} required>
                {subCategories.map((sub) => (
                  <MenuItem key={sub._id} value={sub._id}>
                    {sub.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">{isEdit ? "Update" : "Add"}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
