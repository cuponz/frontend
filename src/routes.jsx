import { lazy } from "react";
import AuthWrapper from "@/components/Wrapper/AuthWrapper";
import RouteWrapper from "@/components/Wrapper/RouteWrapper";

import "./index.css";

const HomePage = lazy(() => import("@/pages/HomePage"));
const ContactUs = lazy(() => import("@/pages/ContactUs"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage"));
const AboutUs = lazy(() => import("@/pages/AboutUs"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const CouponPage = lazy(() => import("@/pages/CouponPage"));
const ShopOwnerProfilePage = lazy(() => import("@/pages/ShopOwnerProfilePage"));
const UserProfile = lazy(() => import("@/pages/UserProfile"));
const Noti = lazy(() => import("@/pages/RedeemResult"));
const ShoppingCart = lazy(() => import("@/pages/ShoppingCart"));

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
		path: "/",
		element: <RouteWrapper />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/shop",
				element: <ShopOwnerProfilePage />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
		],
	},
];

export default routes;