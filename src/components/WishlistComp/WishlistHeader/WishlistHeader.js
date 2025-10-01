import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const WishlistHeader = () => {
  return (
    <Box textAlign="center" my={2}>
      <FavoriteIcon sx={{ fontSize: 40, color: 'grey.700' }} />
      <Typography variant="h4" fontWeight="bold" mt={1}>
        My Wishlist
      </Typography>
    </Box>
  );
};

export default WishlistHeader;
