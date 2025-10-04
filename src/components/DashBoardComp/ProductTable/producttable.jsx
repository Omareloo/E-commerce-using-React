import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const ProductTable = ({ products, onEdit, onDelete }) => {
  console.log(products);
  
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>SubCategory</TableCell>
            <TableCell>Slug</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                      <img src={`http://localhost:3000/uploads/products/${product.image}`} alt={product.title} className="card-img" />
              </TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.Category?.name || "No Category"}</TableCell>
              <TableCell>{product.SubCategory?.name || "No SubCategory"}</TableCell>
              <TableCell>{product.slug}</TableCell>
              <TableCell>{new Date(product.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onEdit(product)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => onDelete(product._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
