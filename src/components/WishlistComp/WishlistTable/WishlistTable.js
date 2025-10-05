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
import { useSelector } from 'react-redux';

const WishlistTable = ({ items, onRemove, onBrowse, onAddToCart, onRemoveFromCart }) => {
  const {content} = useSelector((state) => state.lang);
  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.100' }}>
              <TableCell align="center" sx={{ width: 60 }}>
                {content.Delete}
              </TableCell>
              <TableCell align="center">{content.Image}</TableCell>
              <TableCell align="center">{content.Name}</TableCell>
              <TableCell align="center">{content.Price}</TableCell>
              <TableCell align="center">{content.Stockstatus}</TableCell>
              <TableCell align="center">{content.Actions}</TableCell>
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
          {content.StartShoppingButton}        </Button>
      </Box>
    </>
  );
};

export default WishlistTable;
