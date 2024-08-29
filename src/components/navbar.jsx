import React from 'react';
import './navbar.css';

const Navbar = () => {
  return (
    <div className="navbar-background">
      <nav className="navbar">
        <div className="navbar-left">
          <a href="/">Home</a>
          <a href="#">Hot Deals</a>
          <div className="dropdown">
            <button className="dropbtn">Categories
              <i className="arrow down"></i>
            </button>
            <div className="dropdown-content">
              <a href="#">Desktop</a>
              <a href="#">Laptop</a>
              <a href="#">Mobile</a>
              <a href="#">Xiaomi</a>
              <a href="#">Huawei</a>
              {/* Add more categories as needed */}
            </div>
          </div>
          <a href="contactus">Contact Us</a>
          <a href="aboutus">About Us</a>
        </div>
        <div className="navbar-right">
          <button className="search-btn">
            <i className="fa fa-search"></i> {/* Using FontAwesome for the search icon */}
          </button>
          <button className="login-btn">Login</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
