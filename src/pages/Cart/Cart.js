// src/pages/Cart/Cart.jsx
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchCart,
  removeCartItem,
  clearCartItems,
  updateItemQuantity,
} from '../../redux/slices/cartSlice';

import ProductCard from '../../components/CartComponents/ProductCard/ProductCard';
import Sidebar from '../../components/CartComponents/Sidebar/Sidebar';
import Title from '../../components/CartComponents/Title/Title';
import MyButton from '../../components/CartComponents/MyButton/MyButton';
import MainButton from '../../components/CartComponents/MainButton/MainButton';
import EmptyCart from '../../components/CartComponents/EmptyCart/EmptyCart';
import { addToWishlist } from '../../redux/slices/wishlistSlice';
import { createOrder } from '../../redux/slices/createOrderSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalPrice, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Handlers
  const handleIncrease = (id, quantity) => {
    dispatch(updateItemQuantity({ productId: id, quantity: quantity + 1 }));
  };

  const handleDecrease = (id, quantity) => {
    if (quantity > 1) {
      dispatch(updateItemQuantity({ productId: id, quantity: quantity - 1 }));
    } else {
      dispatch(removeCartItem(id));
    }
  };

  const handleDelete = (id) => {
    dispatch(removeCartItem(id));
  };

  const handleDeleteAll = () => {
    dispatch(clearCartItems());
  };

  const handleMakeOrder = async () => {
    const orderData = {
      shippingAddress: '1213 Main Street, Cairo',
      items: items.map((p) => ({
        productId: p.productId._id,
        quantity: p.quantity,
        price: p.productId.price,
      })),
      totalPrice,
    };
    await dispatch(createOrder(orderData)).unwrap();
    dispatch(clearCartItems());
  };

  const handleAddToFavourite = (productId) => {
    dispatch(addToWishlist(productId));
  };

  const handleButtonClick = () => {
    navigate('/');
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#f5f5f5',
        p: 2,
      }}
    >
      {items && items.length > 0 ? (
        <>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'flex-start',
              gap: { xs: 3, md: 2 },
            }}
          >
            {/* Cards Section */}
            <Box
              sx={{
                flex: 1,
                width: { xs: '100%', sm: '100%', md: '100%', lg: '72vw' },
                display: 'grid',
                gap: 2,
                gridTemplateColumns: '1fr',
              }}
            >
              <Title title="My Cart" itemCount={items.length} />
              <MyButton
                icon={() => null}
                label="Delete all items"
                handleAction={handleDeleteAll}
                message="All items deleted from cart"
              />

              {items.map((product) => (
                <ProductCard
                  key={product.productId._id}
                  title={product.productId.title}
                  image={product.productId.image}
                  price={product.productId.price}
                  quantity={product.quantity}
                  onIncrease={() => handleIncrease(product.productId._id, product.quantity)}
                  onDecrease={() => handleDecrease(product.productId._id, product.quantity)}
                  onDelete={() => handleDelete(product.productId._id)}
                  onAddToFavourite={() => handleAddToFavourite(product.productId._id)}
                />
              ))}
            </Box>

            {/* Sidebar Section */}
            <Box
              sx={{
                width: { xs: '100%', md: '22vw' },
                position: { xs: 'static', md: 'sticky' },
                top: { md: 20 },
              }}
            >
              <Sidebar
                totalPrice={totalPrice.toFixed(2)}
                itemCount={items.length}
                onMakeOrder={handleMakeOrder}
              />
            </Box>
          </Box>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', pb: 2 }}>
            <MainButton
              label="Back to Home"
              onClick={handleButtonClick}
              baseColor="#1976d2"
              hoverColor="#1565c0"
              clickColor="#0d47a1"
              textColor="#fff"
            />
          </Box>
        </>
      ) : (
        <EmptyCart onBrowse={handleButtonClick} />
      )}
    </Box>
  );
};

export default Cart;
