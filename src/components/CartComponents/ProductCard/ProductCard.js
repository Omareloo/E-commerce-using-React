import { Card, CardContent, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Counter from '../Counter/Counter';
import MyButton from '../MyButton/MyButton';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


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
          const { content } = useSelector((state) => state.lang);

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
              src={`http://localhost:3000/uploads/products/${image}`}
              alt={title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                lineHeight: 1.3,
                display: '-webkit-box',
                WebkitLineClamp: 2, 
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
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

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#000',
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                }}
              >
                {content.currency} {price.toLocaleString()}
              </Typography>

              <Counter
                value={quantity}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onDelete={onDelete}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <MyButton
                icon={DeleteIcon}
                label={content.Remove}
                handleAction={onDelete}
                message={content.snackbar}
              />
              <MyButton
                icon={BookmarkBorderIcon}
                label={content.Addtofavourite}
                handleAction={onAddToFavourite}
                message={content.snackbar1}
              />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};


export default ProductCard;
