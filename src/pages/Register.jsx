import { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import CouponImage1 from "../assets/coupon1.png"; // Path to your asset
import CouponImage2 from "../assets/coupon2.png"; // Path to your asset
import Sidebar from "../components/sidenav";
import { FaBars } from "react-icons/fa";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
    } else {
      console.log("Form submitted successfully:", formData);
    }
  };
  const [isOpen, setIsOpen] = useState(false); // State to handle sidebar open/
  return (
    <div className="h-screen bg-gradient-to-br from-[#7766C6] to-[#E0DFFD] relative flex items-center justify-center">
      {/* Sidebar Component */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Sidebar Toggle Button - Only show when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-4 left-4 p-2 text-xl rounded-full bg-white hover:bg-gray-200 focus:outline-none shadow-md z-50 transition-opacity duration-500 ease-in-out opacity-0 hover:opacity-100"
          aria-label="Open Sidebar"
          style={{ opacity: isOpen ? 0 : 1 }}
        >
          <FaBars />
        </button>
      )}

      {/* Main Content */}

      <div className="bg-white w-full max-w-5xl rounded-lg shadow-lg flex overflow-hidden">
        {/* Left Section */}
        <div className="hidden lg:flex lg:flex-col lg:justify-between w-2/5 bg-gradient-to-tr from-purple-400 via-purple-600 to-purple-800 p-8 text-white relative">
          <div className="flex flex-col items-start">
            <h1 className="text-4xl font-bold mb-2">CuponZ</h1>
            <p className="mb-6 text-lg">Generate Cupon everywhere!</p>
            <img
              src={CouponImage2}
              alt="Coupon Graphic"
              className="w-40 transform rotate-[-15deg] mb-8"
            />
          </div>
          <div className="absolute bottom-8 left-0 flex justify-center w-full">
            <img
              src={CouponImage1}
              alt="Discount Coupon"
              className="w-80 transform rotate-[-10deg]"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-3/5 p-12 bg-white rounded-tl-[1-0px]">
          <h2 className="text-3xl font-bold mb-8 text-center lg:text-left">
            Create Account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="p-3 border border-gray-300 rounded w-full"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="p-3 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter Password"
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white font-bold p-3 rounded hover:bg-yellow-600 transition duration-200"
            >
              Create Account
            </button>
          </form>
          <div className="mt-4 text-center">
            <p>
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </p>
          </div>
          <div className="my-6 flex items-center justify-center">
            <div className="border-t border-gray-300 flex-grow mr-2"></div>
            <span className="text-gray-500">or</span>
            <div className="border-t border-gray-300 flex-grow ml-2"></div>
          </div>
          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 border border-gray-300 p-2 rounded hover:bg-gray-100 transition duration-200">
              <FaFacebook className="text-blue-600" />
              Sign up with Facebook
            </button>
            <button className="flex items-center gap-2 border border-gray-300 p-2 rounded hover:bg-gray-100 transition duration-200">
              <FaGoogle className="text-red-500" />
              Sign up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
