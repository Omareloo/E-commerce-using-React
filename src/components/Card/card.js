import React from "react";
import "./card.css"
export default function Card({ product}) {
  return (
    <div className="card">
      <img
        src={product.image}
        alt={product.title}
        className="card-img"
      />
      <div className="card-body">
        <h3 className="card-title">
          {product.title.split(" ").slice(0, 3).join(" ")}
        </h3>
        <p className="card-price">{product.price} EGP</p>
        <p className="card-category">{product.Category?.name}</p>
      </div>
      <div className="card-footer">
        <button
          className="btnAdd"
        
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
