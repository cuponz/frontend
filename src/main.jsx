import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import "./index.css";
import ErrorPage from "./pages/ErrorPage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import CustomerProfilePage from "./pages/CustomerProfilePage.jsx";
import ShopOwnerProfilePage from "./pages/ShopOwnerProfilePage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CouponPage from "./pages/CouponPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contactus",
    element: <ContactUs />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/customerProfile",
    element: <CustomerProfilePage />,
  },

  {
    path: "/shop",
    element: <ShopOwnerProfilePage />,
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/coupon",
    element: <CouponPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
