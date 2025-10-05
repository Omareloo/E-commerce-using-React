import { Box, Typography, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';

const WishlistEmpty = ({ onBrowse }) => {
  const {content} = useSelector((state) => state.lang);
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
        {content.Yourwishlistisempty
        }      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, mb: 4 }}>
        {content.undertextwishlist}      </Typography>

      <Button
        variant="contained"
        size="large"
        startIcon={<ShoppingCartIcon />}
        sx={{ borderRadius: 3, textTransform: 'none' }}
        onClick={onBrowse}
      >
        {content.StartShoppingButton}
      </Button>
    </Box>
  );
};

export default WishlistEmpty;
