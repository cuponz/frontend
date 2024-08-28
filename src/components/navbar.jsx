import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-background">
      <nav className="navbar">
        <div className="navbar-left">
          <a href="/">Home</a>
          <a href="/coupon">All Coupons</a>
          <div className="dropdown">
            <button className="dropbtn">
              Categories
              <i className="arrow down"></i>
            </button>
            <div className="dropdown-content">
              <a href="/coupon?category=Desktop">Desktop</a>
              <a href="/coupon?category=Laptop">Laptop</a>
              <a href="/coupon?category=Mobile">Mobile</a>
              <a href="/coupon?category=Xiaomi">Xiaomi</a>
              <a href="/coupon?category=Huawei">Huawei</a>
            </div>
          </div>
          <a href="contactus">Contact Us</a>
          <a href="aboutus">About Us</a>
        </div>
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
