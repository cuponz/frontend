import React, { useState, useEffect } from "react";
import "./navbar.css";

const Navbar = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Fetch data from your deployed JSON file
    fetch(
      "https://cdn.discordapp.com/attachments/1225107283768377395/1279066133265121340/menuItem.json?ex=66d316aa&is=66d1c52a&hm=17cdce2657a7c5b7501ddb63b572a9fb804b37cb6956a3b9c58b29253108220a&"
    )
      .then((response) => response.json())
      .then((data) => {
        setMenuItems(data.menuItems);
        console.log(data.menuItems);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const renderMenuItems = (items) => {
    return items.map((item, index) => {
      if (item.dropdown) {
        return (
          <div className="dropdown" key={index}>
            <button className="dropbtn">
              {item.name}
              <i className="arrow down"></i>
            </button>
            <div className="dropdown-content">
              {renderMenuItems(item.items)}
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
    });
  };

  return (
    <div className="navbar-background">
      <nav className="navbar">
        <div className="navbar-left">{renderMenuItems(menuItems)}</div>
        <div className="navbar-right">
          <button className="search-btn">
            <i className="fa fa-search"></i>
          </button>
          <button className="login-btn">Login</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;