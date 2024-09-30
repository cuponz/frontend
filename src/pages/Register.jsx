import { useState } from "react";
import CouponImage1 from "../assets/coupon1.png";
import CouponImage2 from "../assets/coupon2.png";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/layout";
import { UserType, CountryListWithCode } from "../constants";
import { useMutation } from "@tanstack/react-query";
import { userRegister } from "../api/user";
import validator from "validator";
import TogglePassword from "../components/Utils/TogglePassword";
import {
  parsePhoneNumberFromString,
  isValidPhoneNumber,
} from "libphonenumber-js";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    region: "AU",
    password: "",
    confirmPassword: "",
    userType: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: userRegister,
    onSuccess: () => {
      toast.success("Register successful!");
      navigate("/login");
    },
    onError: (err) => {
      toast.error(`Register failed. ${err.message}`);
    },
  });

  const formatPhoneNumber = (phone, region) => {
    try {
      const parsedPhone = parsePhoneNumberFromString(phone, region);
      return parsedPhone && parsedPhone.isValid()
        ? parsedPhone.format("E.164")
        : null;
    } catch (error) {
      console.error("Phone parsing error:", error);
      return null;
    }
  };

  const validateForm = () => {
    let formErrors = {};

    if (!validator.isLength(formData.firstName, { min: 2 })) {
      formErrors.firstName = "First name should be at least 2 characters long";
    }
    if (!validator.isLength(formData.lastName, { min: 2 })) {
      formErrors.lastName = "Last name should be at least 2 characters long";
    }
    if (!validator.isEmail(formData.email)) {
      formErrors.email = "Please enter a valid email address";
    }

    if (formData.phoneNumber.trim() !== "") {
      const isValidPhone = isValidPhoneNumber(
        formData.phoneNumber,
        formData.region
      );
      if (!isValidPhone) {
        formErrors.phoneNumber =
          "Please enter a valid phone number or leave it blank";
      }
    }

    if (!validator.isLength(formData.password, { min: 8 })) {
      formErrors.password = "Password should be at least 8 characters long";
    }
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.userType) {
      formErrors.userType = "Please select a user type";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formattedPhone =
        formData.phoneNumber.trim() !== ""
          ? formatPhoneNumber(formData.phoneNumber, formData.region)
          : null;

      const registerData = {
        name: formData.firstName.trim() + " " + formData.lastName.trim(),
        email: formData.email,
        phoneNumber: formattedPhone,
        password: formData.password,
        type: parseInt(formData.userType, 10),
      };
      registerMutation.mutate(registerData);
      const jsonData = JSON.stringify(registerData);
      console.log("Form submitted as JSON:", jsonData);
    } else {
      toast.error("Please correct the errors in the form");
    }
  };

  return (
    <Layout>
      <div className="h-screen bg-gradient-to-br from-[#7766C6] to-[#E0DFFD] relative flex items-center justify-center">
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
                <div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="p-3 border border-gray-300 rounded w-full"
                    required
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="p-3 border border-gray-300 rounded w-full"
                    required
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
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
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <div className="flex">
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className="w-1/3 p-3 border border-gray-300 rounded-l"
                  >
                    {CountryListWithCode.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name} ({country.callingCode})
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number (optional)"
                    className="w-2/3 p-3 border border-gray-300 rounded-r"
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
                <p className="text-gray-500 text-xs mt-1">
                  Optional: Enter a valid phone number for your selected region
                  or leave blank
                </p>
              </div>
              <TogglePassword
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                error={errors.password}
              />
              <TogglePassword
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter Password"
                error={errors.confirmPassword}
              />
              <div className="mb-6">
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select User Type</option>
                  {Object.entries(UserType).map(([key, value]) => (
                    <option key={value} value={value}>
                      {key}
                    </option>
                  ))}
                </select>
                {errors.userType && (
                  <p className="text-red-500 text-sm mt-1">{errors.userType}</p>
                )}
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
                <Link to="/login" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
