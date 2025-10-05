import { Box, Typography } from '@mui/material';
import MyButton from '../CartComponents/MyButton/MyButton';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';

const ProductDetailCard = ({ product, onAddToCart, onAddToWishlist, isInCart, isInWishlist }) => {
      const { content } = useSelector((state) => state.lang);

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
          src={`http://localhost:3000/uploads/products/${product.image}`}
          alt={product.title}
          style={{ width: '100%', borderRadius: '8px' }}
        />
      </Box>
      <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4">{product.title}</Typography>
        <Typography variant="h6">
          {content.Price}:<span style={{ color: '#1976d2' }}>{content.currency} {product.price.toFixed(2)}</span>
        </Typography>
        <Typography variant="body1">{content.Description}: {product.description}</Typography>
        <Typography variant="subtitle2">
          {content.LastUpdated}{' '}
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
            label={isInCart ? content.removefromcart : content.AddToCartButton}
            handleAction={onAddToCart}
            icon={ShoppingCartIcon}
            message={isInCart ? content.snackbar : content.snackbar1}
          />

          <MyButton
            label={isInWishlist ? content.removefromfavourite : content.Addtofavourite}
            handleAction={onAddToWishlist}
            icon={BookmarkBorderIcon}
            message={isInWishlist ? content.snackbar3 : content.snackbar2}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailCard;
