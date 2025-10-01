import { Box, Typography, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const WishlistEmpty = ({ onBrowse }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={8}
      textAlign="center"
    >
      <img
        src="emptyWishlist.ico"
        alt="Empty Wishlist"
        style={{
          marginBottom: '20px',
          width: '130px',
        }}
      />
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Your wishlist is empty
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, mb: 4 }}>
        Start adding your favorite products to save and review them later.
      </Typography>

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
  );
};

export default WishlistEmpty;
