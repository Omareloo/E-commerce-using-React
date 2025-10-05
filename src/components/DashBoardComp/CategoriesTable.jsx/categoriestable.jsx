import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { useSelector } from "react-redux";
const CategoryTable = ({ categories, onEdit, onDelete }) => {
  const {content} = useSelector((state) => state.lang);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{content.Name}</TableCell>
            <TableCell>{content.Actions}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {categories.map((category) => (
            <TableRow key={category._id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onEdit(category)}
                  sx={{ mr: 1 }}
                >
                  {content.Edit}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => onDelete(category._id)}
                >
                  {content.Delete}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoryTable;
