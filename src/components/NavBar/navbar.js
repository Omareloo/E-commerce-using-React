import React, { useContext, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaBoxOpen, FaSearch } from 'react-icons/fa';
import { FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi';
import { IconButton, Tooltip } from '@mui/material';
import { userContext } from '../../Context/Context';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLang } from '../../redux/slices/langSlice';
import './navbar.css';

import { MdLanguage } from 'react-icons/md';

export default function Navbar() {
  const { Usertoken, setToken } = useContext(userContext);
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { lang, content } = useSelector((state) => state.lang);
  const dispatch = useDispatch();

  const changeLang = () => {
    dispatch(toggleLang());
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="navbar" role="banner">
      <Link to="/" className="brand">
        <div className="logo">🛒</div>
        {content.FreshChart}
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
                  <FaBoxOpen /> {content.Orders}
                </NavLink>
              </li>
              <li>
                <NavLink to="/wishlist">
                  <FaHeart /> {content.Wishlist}
                </NavLink>
              </li>
              <li>
                <NavLink to="/Cart">
                  <FaShoppingCart /> {content.Cart}
                </NavLink>
              </li>

              {/* Search Button */}
              <li>
                <Tooltip title={content.Search}>
                  <IconButton
                    onClick={() => setShowSearch(!showSearch)}
                    sx={{ color: '#09c' }}
                  >
                    <FaSearch />
                  </IconButton>
                </Tooltip>
              </li>

              {/* Language Toggle */}
              <li>
                <Tooltip title="Change Language">
                  <IconButton onClick={changeLang} sx={{ color: '#09c' }}>
                    <MdLanguage />
                  </IconButton>
                </Tooltip>
              </li>

              <li>
                <Tooltip title={content.Logout}>
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
                  <FiUserPlus /> {content.RegisterButton}
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="cta">
                  <FiLogIn /> {content.loginButton}
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
            placeholder={content.Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      )}
    </header>
  );
}
