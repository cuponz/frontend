import { lazy } from "react";
import AuthWrapper from "@/components/Wrapper/AuthWrapper";
import RouteWrapper from "@/components/Wrapper/RouteWrapper";
import LoadingSpinner from "@/components/Utils/LoadingSpinner";

import "./index.css";

const ErrorPage = lazy(() => import("@/pages/ErrorPage"));

const HomePage = lazy(() => import("@/pages/HomePage"));
const ContactUs = lazy(() => import("@/pages/ContactUs"));
const AboutUs = lazy(() => import("@/pages/AboutUs"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const CouponPage = lazy(() => import("@/pages/CouponPage"));
const ShopOwnerProfilePage = lazy(() => import("@/pages/ShopOwnerProfilePage"));
const UserProfile = lazy(() => import("@/pages/UserProfile"));
const Noti = lazy(() => import("@/pages/RedeemResult"));
const ShoppingCart = lazy(() => import("@/pages/ShoppingCart"));
const Test = lazy(() => import("@/pages/UserActivate"));

const ErrorElement = () => (
	<div className="flex flex-col justify-center items-center h-screen">
		<LoadingSpinner size="large" color="blue" />
		<p className="mt-4 text-lg text-gray-600">Loading...</p>
	</div>
);

const routes = [
	{
		path: "/",
		element: <AuthWrapper />,
		errorElement: <ErrorElement />,
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
			{
				path: "/test",
				element: <Test />,
			},
		],
	},
	{
		path: "/",
		element: <AuthWrapper isProtected />,
		errorElement: <ErrorElement />,
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
		errorElement: <ErrorElement />,
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
			{
				path: "*",
				element: <ErrorPage />,
			},
		],
	},
];

export default routes;
