import {
  Table, TableHead, TableRow, TableCell,
  TableBody, TableContainer, Paper, IconButton
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function CategoryTable({ categories, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Slug</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((c) => (
            <TableRow key={c._id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.slug}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => onEdit(c)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(c._id)}>
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
