import logo from "../assets/logofooter.png";

const Footer = () => {
  return (
    <footer className="bg-indigo-800 text-gray-200 py-8">
      <div className="container mx-auto text-center">
        <div className="flex justify-center items-center mb-4">
          <img src={logo} alt="CuponZ Logo" className="h-10 mr-2" />
        </div>
        <div className="flex justify-center space-x-12 mb-8">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/hot-deals" className="hover:underline">
            Hot Deals
          </a>
          <a href="/contact-us" className="hover:underline">
            Contact Us
          </a>
          <a href="/about-us" className="hover:underline">
            About Us
          </a>
        </div>
        <hr className="border-gray-400 mb-4" />
        <div className="flex justify-between items-center text-sm mr-10 ml-10">
          <div>© 2024 G71. All rights reserved.</div>
          <div className="flex space-x-8">
            <a href="/terms" className="hover:underline">
              Terms
            </a>
            <a href="/privacy" className="hover:underline">
              Privacy
            </a>
            <a href="/cookies" className="hover:underline">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
