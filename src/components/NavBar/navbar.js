import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaBoxOpen } from "react-icons/fa";
import { FiLogIn, FiUserPlus, FiLogOut } from "react-icons/fi";
import { IconButton, Tooltip } from "@mui/material";
import { userContext } from "../../Context/Context";
import "./navbar.css";

export default function Navbar() {
  const { Usertoken, setToken } = useContext(userContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <header className="navbar" role="banner">
      {/* Left: Logo + Brand */}
      <Link to="/" className="brand">
        <div className="logo">🛒</div>
        FreshChart
      </Link>

      {/* Hamburger for mobile */}
      <input className="hamburger" id="nav-toggle" type="checkbox" />
      <label className="hamburger-label" htmlFor="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </label>

      {/* Menu Links */}
      <nav role="navigation">
        <ul className="menu">
          {Usertoken ? (
            <>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/products">
                  <FaShoppingCart /> Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/orders">
                  <FaBoxOpen /> My Orders
                </NavLink>
              </li>
              <li>
                <NavLink to="/wishlist">
                  <FaHeart /> Wish List
                </NavLink>
              </li>
              <li>
                <Tooltip title="Logout">
                  <IconButton
                    onClick={handleLogout}
                    className="logout-btn"
                    sx={{
                      color: "white",
                      bgcolor: "error.main",
                      "&:hover": { bgcolor: "error.dark" },
                    }}
                  >
                    <FiLogOut />
                  </IconButton>
                </Tooltip>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/register" className="cta">
                  <FiUserPlus /> Register
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="cta">
                  <FiLogIn /> Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
