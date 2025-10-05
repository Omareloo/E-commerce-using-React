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
import { useSelector } from "react-redux";

const ProductTable = ({ products, onEdit, onDelete }) => {
  console.log(products);
  const { content } = useSelector((state) => state.lang);


  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{content.Title}</TableCell>
            <TableCell>{content.Price}</TableCell>
            <TableCell>{content.Image}</TableCell>
            <TableCell>{content.Description}</TableCell>
            <TableCell>{content.Category}</TableCell>
            <TableCell>{content.SubCategory}</TableCell>
            <TableCell>{content.Slug}</TableCell>
            <TableCell>{content.CreatedAt}</TableCell>
            <TableCell>{content.Actions}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <img src={`http://localhost:3000/uploads/products/${product.image}`} alt={product.title} className="card-img" style={{ width: "100px", height: "80px" }} />
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
                  {content.Edit}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => onDelete(product._id)}
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

export default ProductTable;
