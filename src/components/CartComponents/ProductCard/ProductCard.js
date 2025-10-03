import { Card, CardContent, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Counter from '../Counter/Counter';
import MyButton from '../MyButton/MyButton';
import { Link } from 'react-router-dom';

const ProductCard = ({
  _id,
  title,
  image,
  price,
  quantity = 1,
  onIncrease,
  onDecrease,
  onDelete,
  onAddToFavourite,
}) => {
  return (
    <Card
      sx={{
        width: { xs: '100%', md: '72vw' },
        margin: 0,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderRadius: 2,
        '&:hover': {
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          {/* Product Image */}
          <Box
            sx={{
              width: { xs: 100, sm: 120, md: 140 },
              height: 140,
              flexShrink: 0,
              borderRadius: 1,
              overflow: 'hidden',
              backgroundColor: '#f5f5f5',
            }}
          >
            <img
              src={image || '/placeholder.svg'}
              alt={title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>

          {/* Product Details */}
          <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            {/* Product Title - 2 lines only */}
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                lineHeight: 1.3,
                display: '-webkit-box',
                WebkitLineClamp: 2, // 2 lines only
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis', // Add ... at the end
                mb: 1,
                fontSize: { xs: '0.875rem', sm: '1rem' },
              }}
            >
              <Link
                to={`/Products/${_id}`}
                style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}
              >
                {title}
              </Link>
            </Typography>

            {/* Price and Counter Row */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              {/* Price - Top right */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#000',
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                }}
              >
                EGP {price.toLocaleString()}
              </Typography>

              {/* Quantity Counter */}
              <Counter
                value={quantity}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onDelete={onDelete}
              />
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <MyButton
                icon={DeleteIcon}
                label="Remove"
                handleAction={onDelete}
                message="Item removed from cart"
              />
              <MyButton
                icon={BookmarkBorderIcon}
                label="Add to favourite"
                handleAction={onAddToFavourite}
                message="Item added to favourite"
              />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
