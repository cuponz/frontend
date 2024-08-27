import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import "./index.css";
import ErrorPage from "./pages/ErrorPage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ShopOwnerManage from "./pages/ShopOwnerManage.jsx";
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
    path: "/shopdetail",
    element: <ShopOwnerManage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
