import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import './card.css';
import { Alert, Popover } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Card({
  product,
  onAddToCart,
  onRemoveFromCart,
  onAddToFavourite,
  onRemoveFromFavourite,
  isFav,
}) {
  const cartItems = useSelector((state) => state.cart.items);
  const { content } = useSelector((state) => state.lang);

  const isInCart = cartItems.some((item) => item.productId._id === product._id);

  const [anchorEl, setAnchorEl] = useState(null);
  const [message, setMessage] = useState('');
  const [fav, setFav] = useState(isFav);

  useEffect(() => {
    setFav(isFav);
  }, [isFav]);

  const handleCartAction = (event) => {
    if (isInCart) {
      if (onRemoveFromCart) onRemoveFromCart(product._id);
      setMessage(content.snackbar);
    } else {
      if (onAddToCart) onAddToCart(product._id);
      setMessage(content.snackbar1);
    }

    setAnchorEl(event.currentTarget);
    setTimeout(() => {
      setAnchorEl(null);
    }, 1000);
  };

  const open = Boolean(anchorEl);

  const handleFavAction = () => {
    if (fav) {
      onRemoveFromFavourite && onRemoveFromFavourite(product._id);
      setFav(false);
    } else {
      onAddToFavourite && onAddToFavourite(product._id);
      setFav(true);
    }
  };

  return (
    <div className="card">
      <div className="wishlist-icon" onClick={handleFavAction}>
        <FaHeart className={fav ? 'heart active' : 'heart'} />
      </div>
      <img
        src={`http://localhost:3000/uploads/products/${product.image}`}
        alt={product.title}
        className="card-img"
      />
      <div className="card-body">
        <Link
          to={`/Products/${product._id}`}
          style={{ textDecoration: 'none', fontWeight: 'bold' }}
        >
          <h3 className="card-title">{product.title.split(' ').slice(0, 3).join(' ')}</h3>
        </Link>
        <p className="card-category">{product.Category?.name}</p>
        <p className="card-price">{product.price} EGP</p>
      </div>

      <div className="card-footer">
        <button className="btnAdd" onClick={handleCartAction}>
          {isInCart ? content.removefromcart : content.AddToCartButton}
        </button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          PaperProps={{ sx: { boxShadow: 1, borderRadius: 1, mt: 1 } }}
        >
          <Alert
            severity="info"
            sx={{
              backgroundColor: '#e0e0e0ff',
              padding: '2px 8px',
              fontSize: '14px',
              whiteSpace: 'nowrap',
            }}
          >
            {message}
          </Alert>
        </Popover>
      </div>
    </div>
  );
}
