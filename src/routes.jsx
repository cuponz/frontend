import AuthWrapper from "./components/Wrapper/AuthWrapper.jsx";

import HomePage from "./pages/HomePage.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import "./index.css";

import ErrorPage from "./pages/ErrorPage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CouponPage from "./pages/CouponPage.jsx";
import CustomerProfilePage from "./pages/CustomerProfilePage.jsx";
import ShopOwnerProfilePage from "./pages/ShopOwnerProfilePage.jsx";
import ShopOwnerManage from "./pages/ShopOwnerManage.jsx";

const routes = [
  {
    path: "/",
    element: <AuthWrapper/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/contactus",
        element: <ContactUs />,
      },
      {
        path: "/coupon",
        element: <CouponPage />,
      },
    ]
  },
  {
    path: "/customerProfile",
    element: <CustomerProfilePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/shopmanage",
    element: <ShopOwnerManage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/shop",
    element: <ShopOwnerProfilePage />,
    errorElement: <ErrorPage />,
	},
	{
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
