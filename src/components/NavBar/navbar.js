import React, { useContext, useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi';
import { IconButton, Tooltip } from '@mui/material';
import { userContext } from '../../Context/Context';
import './navbar.css';
import { useSelector } from 'react-redux';
import BadgeCounter from '../BadgeCounter/BadgeCounter';
import { toggleLang } from '../../redux/slices/langSlice';
import { useDispatch } from 'react-redux';
import { MdLanguage } from 'react-icons/md';



export default function Navbar() {
  const { Usertoken, setToken } = useContext(userContext);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navbarRef = useRef(null); 
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { content } = useSelector((state) => state.lang);
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
       navigate(`/?keyword=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
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
          {token ? (
            <>
              <li>
                <NavLink to="/wishlist">
                  <BadgeCounter
                    count={wishlistItems.length}
                    icon={<FaHeart />}
                    tooltip="WishList"
                  />
                </NavLink>
              </li>
              <li>
                <NavLink to="/Cart">
                  <BadgeCounter count={cartItems.length} icon={<FaShoppingCart />} tooltip="Cart" />{' '}
                </NavLink>
              </li>

              <li>
                <Tooltip title="Search">
                  <IconButton onClick={() => setShowSearch(!showSearch)} sx={{ color: '#09c' }}>
                    <FaSearch />
                  </IconButton>
                </Tooltip>
              </li>


              <li>
                <Tooltip title="Change Language">
                  <IconButton onClick={changeLang} sx={{ color: '#09c' }}>
                    <MdLanguage />
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
                <Tooltip title="Change Language">
                  <IconButton onClick={changeLang} sx={{ color: '#09c' }}>
                    <MdLanguage />
                  </IconButton>
                </Tooltip>
              </li>
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

      {showSearch && (
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder={content.SearchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </form>
      )}
    </header>
  );
}