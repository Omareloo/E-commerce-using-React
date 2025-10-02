import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import "./card.css";

export default function Card({ product }) {
  const [isFav, setIsFav] = useState(false);

  const toggleFav = () => {
    setIsFav(!isFav);
  };

  return (
    <div className="card">
      <div className="wishlist-icon" onClick={toggleFav}>
        <FaHeart className={isFav ? "heart active" : "heart"} />
      </div>
      
      <img src={product.image} alt={product.title} className="card-img" />
      
      <div className="card-body">
        <h3 className="card-title">
          {product.title.split(" ").slice(0, 3).join(" ")}
        </h3>
        <p className="card-category">{product.Category?.name}</p>
        <p className="card-price">{product.price} EGP</p>
      </div>

      <div className="card-footer">
        <button className="btnAdd">Add To Cart</button>
      </div>
    </div>
  );
}
