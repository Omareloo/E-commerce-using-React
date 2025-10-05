import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { useSelector } from "react-redux";

export default function Footer() {

    const { content } = useSelector((state) => state.lang);

  return (
    <footer className="footer">
      <div className="container">
        <p className="brand">
          <Link to="/" className="link">
            {content.FreshChart}
          </Link>
        </p>
        <ul className="navLinks">
          <li>
            <Link to="/about" className="link">{content.about}</Link>
          </li>
          <li>
            <Link to="/contact" className="link">{content.contact}</Link>
          </li>
          <li>
            <Link to="/privacy" className="link">{content.privacy}</Link>
          </li>
        </ul>
        <p className="copy">
         {content.textFooter}
        </p>
      </div>
    </footer>
  );
}
