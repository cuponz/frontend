import AuthWrapper from "@/components/Wrapper/AuthWrapper";

import HomePage from "@/pages/HomePage";
import ContactUs from "@/pages/ContactUs";
import "./index.css";

import ErrorPage from "@/pages/ErrorPage";
import AboutUs from "@/pages/AboutUs";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import CouponPage from "@/pages/CouponPage";
import ShopOwnerProfilePage from "@/pages/ShopOwnerProfilePage";
import UserProfile from "@/pages/UserProfile";
import Noti from "@/pages/RedeemResult";
import ShoppingCart from "@/pages/ShoppingCart";

const routes = [
	{
		path: "/",
		element: <AuthWrapper />,
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
			{
				path: "/cart",
				element: <ShoppingCart />,
			},
		],
	},
	{
		path: "/",
		element: <AuthWrapper isProtected />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "profile",
				element: <UserProfile />,
			},
			{
				path: "/redeem/:redeemId",
				element: <Noti />,
			},
		],
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
