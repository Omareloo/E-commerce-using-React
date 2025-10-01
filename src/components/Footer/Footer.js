import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; // استدعاء ملف CSS العادي

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="brand">
          <Link to="/" className="link">
            FreshCart
          </Link>
        </p>
        <ul className="navLinks">
          <li>
            <Link to="/about" className="link">About</Link>
          </li>
          <li>
            <Link to="/contact" className="link">Contact</Link>
          </li>
          <li>
            <Link to="/privacy" className="link">Privacy</Link>
          </li>
        </ul>
        <p className="copy">
          © {new Date().getFullYear()} FreshCart. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
