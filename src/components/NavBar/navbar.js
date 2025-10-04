import React, { useContext, useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaBoxOpen, FaSearch } from 'react-icons/fa';
import { FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi';
import { IconButton, Tooltip } from '@mui/material';
import { userContext } from '../../Context/Context';
import './navbar.css';

export default function Navbar() {
  const { Usertoken, setToken } = useContext(userContext);
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navbarRef = useRef(null); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
       navigate(`/?keyword=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

   useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSearch && navbarRef.current && !navbarRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);


  return (
    <header className="navbar" role="banner" ref={navbarRef}>
      <Link to="/" className="brand">
        <div className="logo">🛒</div>
        FreshChart
      </Link>

      <input className="hamburger" id="nav-toggle" type="checkbox" />
      <label className="hamburger-label" htmlFor="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </label>

      <nav role="navigation">
        <ul className="menu">
          {Usertoken ? (
            <>
              <li>
                <NavLink to="/orders">
                  <FaBoxOpen /> MyOrders
                </NavLink>
              </li>
              <li>
                <NavLink to="/wishlist">
                  <FaHeart /> WishList
                </NavLink>
              </li>
              <li>
                <NavLink to="/Cart">
                  <FaShoppingCart /> Cart
                </NavLink>
              </li>

              {/* Search Button */}
              <li>
                <Tooltip title="Search">
                  <IconButton
                    onClick={() => setShowSearch(!showSearch)}
                    sx={{ color: '#09c' }}
                  >
                    <FaSearch />
                  </IconButton>
                </Tooltip>
              </li>

              <li>
                <Tooltip title="Logout">
                  <IconButton
                    onClick={handleLogout}
                    className="logout-btn"
                    sx={{
                      color: 'white',
                      bgcolor: 'error.main',
                      '&:hover': { bgcolor: 'error.dark' },
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

      {/* Search Box */}
      {showSearch && (
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </form>
      )}
    </header>
  );
}