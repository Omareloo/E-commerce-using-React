import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Button,
  Box,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import WishlistRow from '../WishlistRow/WishlistRow';

const WishlistTable = ({ items, onRemove, onBrowse, onAddToCart, onRemoveFromCart }) => {
  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.100' }}>
              <TableCell align="center" sx={{ width: 60 }}>
                Remove
              </TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Product name</TableCell>
              <TableCell align="center">Unit price</TableCell>
              <TableCell align="center">Stock status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <WishlistRow
                key={item._id}
                item={item}
                onRemove={onRemove}
                onAddToCart={() => onAddToCart(item.productId._id)}
                onRemoveFromCart={() => onRemoveFromCart(item.productId._id)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<ShoppingCartIcon />}
          sx={{ borderRadius: 3, textTransform: 'none' }}
          onClick={onBrowse}
        >
          Start shopping
        </Button>
      </Box>
    </>
  );
};

export default WishlistTable;
