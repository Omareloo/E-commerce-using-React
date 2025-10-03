import { Box, Typography, Button } from '@mui/material';
import MyButton from '../CartComponents/MyButton/MyButton';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductDetailCard = ({ product, onAddToCart, onAddToWishlist }) => {
  if (!product) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 4,
        p: 3,
        background: '#fff',
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Box sx={{ flex: 1 }}>
        <img
          src={`http://localhost:3000/images/${product.image}`}
          alt={product.title}
          style={{ width: '100%', borderRadius: '8px' }}
        />
      </Box>
      <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4">{product.title}</Typography>
        <Typography variant="h6">
          Price: <span style={{ color: '#1976d2' }}>EGP {product.price.toFixed(2)}</span>
        </Typography>
        <Typography variant="body1">Description: {product.description}</Typography>
        <Typography variant="subtitle2">
          Last Updated:{' '}
          {new Date(product.updatedAt).toLocaleString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <MyButton
            label="Add to Cart"
            handleAction={onAddToCart}
            icon={ShoppingCartIcon}
            message="Item added to cart"
          />
          <MyButton
            label="Add to Favourite"
            handleAction={onAddToWishlist}
            icon={BookmarkBorderIcon}
            message="Item added to favourite"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailCard;
