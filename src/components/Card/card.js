import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import './card.css';
import { Alert, Popover } from '@mui/material';

export default function Card({ product, onAddToCart }) {
  const [message, setMessage] = useState(null);

  const handleAddToCart = (event) => {
    if (onAddToCart) {
      onAddToCart();
    }
    setMessage(event.currentTarget);
    setTimeout(() => {
      setMessage(null);
    }, 1000);
  };

  const opening = Boolean(message);

  const [isFav, setIsFav] = useState(false);

  const toggleFav = () => {
    setIsFav(!isFav);
  };

  return (
    <div className="card">
      <div className="wishlist-icon" onClick={toggleFav}>
        <FaHeart className={isFav ? 'heart active' : 'heart'} />
      </div>
      <img
        src={`http://localhost:3000/uploads/products/${product.image}`}
        alt={product.title}
        className="card-img"
      />
      <div className="card-body">
        <h3 className="card-title">{product.title.split(' ').slice(0, 3).join(' ')}</h3>
        <p className="card-category">{product.Category?.name}</p>
        <p className="card-price">{product.price} EGP</p>
      </div>

      <div className="card-footer">
        <button
          className="btnAdd"
          onClick={(event) => {
            handleAddToCart(event);
          }}
        >
          Add To Cart
        </button>
        <Popover
          open={opening}
          anchorEl={message}
          onClose={() => setMessage(null)}
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
            Item added to cart
          </Alert>
        </Popover>
      </div>
    </div>
  );
}
