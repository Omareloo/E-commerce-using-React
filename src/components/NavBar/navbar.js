import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaBoxOpen } from "react-icons/fa";
import { FiLogIn, FiUserPlus, FiLogOut } from "react-icons/fi";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar" role="banner">
      {/* Left: Logo + Brand */}
      <Link to="/" className="brand">
        <div className="logo">E</div>
        E_Commerce
      </Link>

      {/* Hamburger menu for mobile */}
      <input className="hamburger" id="nav-toggle" type="checkbox" />
      <label className="hamburger-label" htmlFor="nav-toggle">
        <span></span>
      </label>

      {/* Right: Links */}
      <nav role="navigation">
        <ul className="menu">
          <li>
            <NavLink to="">Home</NavLink>
          </li>
          <li>
            <NavLink to="ProductDetails">
              <FaShoppingCart /> ProductDetails
            </NavLink>
          </li>
          <li>
            <NavLink to="MyOrders">
              <FaBoxOpen /> MyOrders
            </NavLink>
          </li>
          <li>
            <NavLink to="WishList">
              <FaHeart /> WishList
            </NavLink>
          </li>
          <li>
            <NavLink to="register" className="cta">
              <FiUserPlus /> Register
            </NavLink>
          </li>
          <li>
            <NavLink to="Login" className="cta">
              <FiLogIn /> Login
            </NavLink>
          </li>
          <li>
            <NavLink to="logout" className="logout-btn">
              <FiLogOut /> Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
