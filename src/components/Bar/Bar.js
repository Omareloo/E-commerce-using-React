import React from "react";
import "./Bar.css";

export default function Bar({ categories, onSelect }) {
  console.log(categories);
  
  return (
    <div className="categories-bar">
    <button  className="category-btn" onClick={() => onSelect("all")}>All</button>
{categories.map((cat) => (
  <button key={cat._id}  className="category-btn" onClick={() => onSelect(cat._id)}>
    {cat.name}
  </button>
))}
    </div>
  );
}

