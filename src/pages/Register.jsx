import { useState } from "react";
import CouponImage1 from "../assets/coupon1.png";
import CouponImage2 from "../assets/coupon2.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../layout/layout";
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
    const registerData = {
      mame: formData.firstName.trim() + " " + formData.lastName.trim(),
      email: formData.email,
      password: formData.password,
      confirmpassword: formData.confirmpassword,
    };
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password did not match!");
    } else {
      const jsonData = JSON.stringify(registerData);
      console.log("Form submitted as JSON:", jsonData);
      toast.success("Register successful!");
    }
  };
  return (
    <Layout>
      <div className="h-screen bg-gradient-to-br from-[#7766C6] to-[#E0DFFD] relative flex items-center justify-center">
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
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default RegisterPage;
