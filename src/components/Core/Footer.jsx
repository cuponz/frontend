import logo from "../../assets/logofooter.png";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-indigo-800 text-gray-200 py-8">
      <div className="container mx-auto text-center">
        <div className="flex justify-center items-center mb-4">
          <img src={logo} alt="CuponZ Logo" className="h-10 mr-2" />
        </div>
        <div className="flex justify-center space-x-12 mb-8">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link to="/coupon" className="hover:underline">
            Hot Deals
          </Link>
          <Link to="/contactus" className="hover:underline">
            Contact Us
          </Link>
          <Link to="/aboutus" className="hover:underline">
            About Us
          </Link>
        </div>
        <hr className="border-gray-400 mb-4" />
        <div>© 2024 G71. All rights reserved.</div>
      </div>
    </footer>
  );
};
export default Footer;
