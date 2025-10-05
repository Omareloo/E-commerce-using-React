import {
  TableRow,
  TableCell,
  IconButton,
  Box,
  Typography,
  Chip,
  Button,
  Popover,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const WishlistRow = ({ item, onRemove, onAddToCart, onRemoveFromCart }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((cartItem) => cartItem.productId._id === item.productId._id);

  const [anchorEl, setAnchorEl] = useState(null);

  const [anchorel, setAnchorel] = useState(null);
  const [message, setMessage] = useState('');
  const {content} = useSelector((state) => state.lang);

  const handleCartAction = (event) => {
    if (isInCart) {
      if (onRemoveFromCart) onRemoveFromCart(item.productId._id);
      setMessage(content.snackbar);
    } else {
      if (onAddToCart) onAddToCart(item.productId._id);
      setMessage(content.snackbar1);
    }

    setAnchorel(event.currentTarget);
    setTimeout(() => {
      setAnchorel(null);
    }, 1000);
  };

  const opening = Boolean(anchorel);

  const handleRemoveClick = (event) => {
    if (onRemove) {
      onRemove(item.productId._id);
    }
    setAnchorEl(event.currentTarget);
    setTimeout(() => {
      setAnchorEl(null);
    }, 1000);
  };

  const open = Boolean(anchorEl);

  return (
    <TableRow sx={{ height: 100 }}>
      <TableCell align="center">
        <Box sx={{ display: 'flex' }}>
          <IconButton color="error" onClick={handleRemoveClick}>
            <DeleteIcon />
          </IconButton>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            PaperProps={{
              sx: {
                boxShadow: 1,
                borderRadius: 1,
                mt: 1,
              },
            }}
          >
            <Alert
              severity="info"
              sx={{
                backgroundColor: '#e0e0e0ff',
                padding: '2px 8px',
                fontSize: '14px',
                whiteSpace: 'nowrap',
              }}
            >
              {content.snackbar}            </Alert>
          </Popover>
        </Box>
      </TableCell>
      <TableCell
        align="center"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: 2,
            backgroundColor: 'grey.100',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={`http://localhost:3000/uploads/products/${item.productId.image}`}
            alt={item.productId.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
      </TableCell>

      <TableCell align="center">
        <Typography fontWeight="bold">
          <Link
            to={`/Products/${item.productId._id}`}
            style={{ textDecoration: 'none', color: '#1976d2' }}
          >
            {item.productId.title}
          </Link>
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body1" fontWeight="bold" color="success.main">
          {item.productId.price}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Chip label="In Stock" color="success" variant="outlined" />
      </TableCell>
      <TableCell align="center">
        <Button
          variant="contained"
          color="success"
          startIcon={<ShoppingCartIcon />}
          sx={{ borderRadius: 3, textTransform: 'none' }}
          onClick={handleCartAction}
        >
          {isInCart ? content.removefromcart : content.AddToCartButton}
        </Button>

        <Popover
          open={opening}
          anchorEl={anchorel}
          onClose={() => setAnchorel(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          PaperProps={{ sx: { boxShadow: 1, borderRadius: 1, mt: 1 } }}
        >
          <Alert
            severity="info"
            sx={{
              backgroundColor: '#e0e0e0ff',
              padding: '2px 8px',
              fontSize: '14px',
              whiteSpace: 'nowrap',
            }}
          >
            {message}
          </Alert>
        </Popover>
      </TableCell>
    </TableRow>
  );
};

export default WishlistRow;
