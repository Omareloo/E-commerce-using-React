import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductDetailCard from '../../components/ProductDetailCard/ProductDetailCard';
import { addCartItem, removeCartItem } from '../../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist, fetchWishlist } from '../../redux/slices/wishlistSlice';
import { Typography, Box, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axiosInstance from '../../axiousinstance/axiousinstance';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isInCart = cartItems.some((i) => i.productId._id === id);
  const isInWishlist = wishlistItems.some((i) => i.productId._id === id);

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
    if (isInCart) {
      dispatch(removeCartItem(id));
    } else {
      dispatch(addCartItem({ productId: id, quantity: 1 }));
    }
  };

  const handleAddToWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(id));
    } else {
      dispatch(addToWishlist(id));
    }

    dispatch(fetchWishlist());
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
          isInCart={isInCart}
          isInWishlist={isInWishlist}
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
