import React from "react";
import "./Bar.css"; // هنعمل استايل بسيط

export default function Bar({ categories, onSelect }) {
  return (
    <div className="categories-bar">
      {categories.map((cat, i) => (
        <button
          key={i}
          className="category-btn"
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
