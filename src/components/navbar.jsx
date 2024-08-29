import React from "react";
import "./navbar.css";
import { menuItems } from "../data/menuData.js";

const Navbar = () => {
  return (
    <div className="navbar-background">
      <nav className="navbar">
        <div className="navbar-left">
          {menuItems.map((item, index) => {
            if (item.dropdown) {
              return (
                <div className="dropdown" key={index}>
                  <button className="dropbtn">
                    {item.name}
                    <i className="arrow down"></i>
                  </button>
                  <div className="dropdown-content">
                    {item.items.map((subItem, subIndex) => (
                      <a href={subItem.link} key={subIndex}>
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                </div>
              );
            } else {
              return (
                <a href={item.link} key={index}>
                  {item.name}
                </a>
              );
            }
          })}
        </div>
        <div className="navbar-right">
          <button className="search-btn">
            <i className="fa fa-search"></i>{" "}
            {/* Using FontAwesome for the search icon */}
          </button>
          <button className="login-btn">Login</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
