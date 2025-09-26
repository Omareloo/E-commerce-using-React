import React from 'react'
import "./Navbar.css"
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom';
import WishList from './../../pages/WishList/WishList';
export default function Navbar() {
  return (
    <>
      <header className="navbar" role="banner">
    <Link href="#" className="brand" aria-label="الرئيسية">
      <div className="logo">E</div>
      E_commerce
    </Link>

    <input className="hamburger" id="nav-toggle" type="checkbox" />
    <label className="hamburger-label" for="nav-toggle" aria-hidden="true" title="فتح القائمة">
      <span></span>
    </label>

    <nav role="navigation" aria-label=" HomePage">
      <ul className="menu">
        <li><NavLink to="">Home</NavLink></li>
        <li><NavLink to="ProductDetails">ProductDetails</NavLink></li>
        <li><NavLink to="MyOrders">MyOrders</NavLink></li>
        <li><NavLink to="WishList">WishList</NavLink></li>
        <li><NavLink to="register" className="cta">Register</NavLink></li>
        <li><NavLink to="Login" className="cta">Login</NavLink></li>
      </ul>
    </nav>
  </header>

    </>
  )
}
