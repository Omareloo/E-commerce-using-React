import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProductDetailCard from '../../components/ProductDetailCard/ProductDetailCard';
import { addCartItem } from '../../redux/cartSlice';
import { addToWishlist } from '../../redux/wishlistSlice';
import { Typography, Box, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axiosInstance from '../../axiousinstance/axiousinstance';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosInstance.get(`/Products/${id}`);
        setProduct(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addCartItem({ productId: product._id, quantity: 1 }));
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product._id));
  };

  const handleBrowse = () => {
    navigate('/');
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!product) return <Typography>Product not found</Typography>;

  return (
    <>
      <Box sx={{ minHeight: '70vh', background: '#f5f5f5', p: 2 }}>
        <ProductDetailCard
          product={product}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<ShoppingCartIcon />}
          sx={{ borderRadius: 3, textTransform: 'none' }}
          onClick={handleBrowse}
        >
          Start shopping
        </Button>
      </Box>
    </>
  );
};

export default ProductDetails;
