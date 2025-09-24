import {
  Table, TableHead, TableRow, TableCell,
  TableBody, TableContainer, Paper, IconButton
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>SubCategory</TableCell>
            <TableCell>Slug</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p._id}>
              <TableCell>{p.title}</TableCell>
              <TableCell>{p.price}</TableCell>
              <TableCell>{p.Catergory?.name}</TableCell>
              <TableCell>{p.SubCatergory?.name}</TableCell>
              <TableCell>{p.slug}</TableCell>
              <TableCell>{p.description}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => onEdit(p)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(p._id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
