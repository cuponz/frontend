import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <div className="footer-background">
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-nav">
            <a href="/">Home</a>
            <a href="/contactus">Contact Us</a>
            <a href="/aboutus">About Us</a>
          </div>
          <div className="footer-subscribe">
            <label htmlFor="email">Get Notification:</label>
            <input type="email" id="email" placeholder="User@gmail.com" />
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 GTI. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;