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

const WishlistRow = ({ item, onRemove, handleClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);

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
      {/* Delete */}
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
              Item removed from wishlist
            </Alert>
          </Popover>
        </Box>
      </TableCell>
      {/* Image */}
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
            src={item.productId.image}
            alt={item.productId.title}
            sx={{
              width: '90%',
              height: '90%',
              objectFit: 'contain',
            }}
          />
        </Box>
      </TableCell>

      {/* Product Title */}
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
      {/* Price */}
      <TableCell align="center">
        <Typography variant="body1" fontWeight="bold" color="success.main">
          {item.productId.price}
        </Typography>
      </TableCell>
      {/* Stock */}
      <TableCell align="center">
        <Chip label="In Stock" color="success" variant="outlined" />
      </TableCell>
      {/* Actions */}
      <TableCell align="center">
        <Button
          variant="contained"
          color="success"
          startIcon={<ShoppingCartIcon />}
          sx={{ borderRadius: 3, textTransform: 'none' }}
          onClick={handleClick}
        >
          Add to Cart
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default WishlistRow;
