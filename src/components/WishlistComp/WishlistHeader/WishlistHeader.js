import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';

const WishlistHeader = () => {
  const {content} = useSelector((state) => state.lang);
  return (
    <Box textAlign="center" my={2}>
      <FavoriteIcon sx={{ fontSize: 40, color: 'grey.700' }} />
      <Typography variant="h4" fontWeight="bold" mt={1}>
        {content.MyWishlist}
      </Typography>
    </Box>
  );
};

export default WishlistHeader;
