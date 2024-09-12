import { useState } from "react";
import { FaBars } from "react-icons/fa"; // Import the icon for opening the sidebar
import logo from "../assets/logo.png"; // Import the logo image
import Sidebar from "../components/sidenav";

function LoginPage() {
  const [isOpen, setIsOpen] = useState(false); // State to handle sidebar open/close

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7766C6] to-[#E0DFFD] relative">
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
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full mx-10">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="CuponZ Logo" className="h-16" />
        </div>
        <h2 className="text-center text-2xl font-bold mb-6">
          Login to your account
        </h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember Me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Login Now
          </button>
        </form>
        <div className="mt-6 flex justify-center items-center content-center">
          <p className="text-sm content-center">
            Don&apos;t have an Account?{" "}
            <a
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
