import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Grid
} from "@mui/material";

export default function CategoryFormModal({ open, onClose, onSubmit, initialData }) {
  const isEdit = Boolean(initialData);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? "Edit Category" : "Add Category"}</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Category Name"
                name="name"
                fullWidth
                defaultValue={initialData?.name}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Slug"
                name="slug"
                fullWidth
                defaultValue={initialData?.slug}
                required
              />
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
