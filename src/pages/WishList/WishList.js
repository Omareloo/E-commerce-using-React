import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWishlist, removeFromWishlist, clearWishlist } from '../../redux/wishlistSlice';

import WishlistHeader from '../../components/WishlistComp/WishlistHeader/WishlistHeader';
import WishlistTable from '../../components/WishlistComp/WishlistTable/WishlistTable';
import WishlistEmpty from '../../components/WishlistComp/WishlistEmpty/WishlistEmpty';
import { useNavigate } from 'react-router-dom';
import { addCartItem, removeCartItem } from '../../redux/cartSlice';
import MyButton from '../../components/CartComponents/MyButton/MyButton';

const WishList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleAddToCart = (productId) => {
    dispatch(addCartItem({ productId, quantity: 1 }));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeCartItem(productId));
  };

  const handleDeleteAll = () => {
    dispatch(clearWishlist());
  };

  const handleBrowse = () => {
    navigate('/');
  };

  if (loading) return <p>Loading wishlist...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <Box sx={{ py: 3, px: 7 }}>
      <WishlistHeader />
      {items && items.length > 0 ? (
        <>
          <MyButton
            icon={() => null}
            label="Delete all items"
            handleAction={handleDeleteAll}
            message="All items deleted from wishlist"
          />
          <WishlistTable
            items={items}
            onRemove={handleRemove}
            onBrowse={handleBrowse}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
          />
        </>
      ) : (
        <WishlistEmpty onBrowse={handleBrowse} />
      )}
    </Box>
  );
};

export default WishList;
