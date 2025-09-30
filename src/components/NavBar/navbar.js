import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaBoxOpen } from "react-icons/fa";
import { FiLogIn, FiUserPlus, FiLogOut } from "react-icons/fi";
import "./Navbar.css";
// import { userContext } from "../../Context/Context";
import { userContext } from "./../../Context/Context";
import { Button, IconButton, Tooltip } from "@mui/material";

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
          {/* روابط أساسية للمسجل دخول */}
          {Usertoken && (
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
          )}

          {/* روابط لو مش عامل تسجيل دخول */}
          {!Usertoken && (
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
