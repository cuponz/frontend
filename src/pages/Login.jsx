import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import CouponImage2 from "@/assets/coupon2";
import Layout from "../layout/Layout";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../api/user";
import TogglePassword from "../components/Utils/TogglePassword";
import { useTranslations } from "../store/languages";

const LoginPage = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { t } = useTranslations();
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const loginMutation = useMutation({
		mutationKey: ["login"],
		mutationFn: userLogin,
		onSuccess: () => {
			toast.success("Login successful!");
			navigate("/");
		},
		onError: (err) => {
			toast.error(`Login failed. ${err.message}`);
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		if (formData.email === "" || formData.password === "") {
			toast.error("Please fill in all fields!");
		} else {
			loginMutation.mutate(formData);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#7766C6] to-[#E0DFFD] flex items-center justify-center p-4">
			{/* Main Container */}
			<div className="bg-white w-full max-w-5xl rounded-lg shadow-lg flex flex-col lg:flex-row overflow-hidden">
				{/* Left Section */}
				<div className="w-full lg:w-3/5 p-6 sm:p-8 lg:p-12 bg-white">
					<h2 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 text-center lg:text-left">
						{t(["login", "form", "title"])}
					</h2>
					<form onSubmit={handleSubmit}>
						<div className="mb-6 lg:mb-8">
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder={t(["login", "form", "email"])}
								className="w-full p-3 border border-gray-300 rounded"
								required
							/>
						</div>
						<div className="mb-6 lg:mb-8">
							<TogglePassword
								type="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								placeholder={t(["login", "form", "password"])}
								className="w-full p-3 border border-gray-300 rounded"
								required
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-yellow-500 text-white font-bold p-3 rounded hover:bg-yellow-600 transition duration-200"
						>
							{t(["login", "form", "button"])}
						</button>
					</form>
					<div className="mt-4 text-center">
						<p>
							{t(["login", "form", "registerQuote"])}{" "}
							<Link to="/register" className="text-blue-500 hover:underline">
								{t(["login", "form", "registerLink"])}
							</Link>
						</p>
					</div>
				</div>

				{/* Right Section */}
				<div className="hidden lg:flex w-full lg:w-2/5 p-8 bg-gradient-to-tr from-purple-400 via-purple-600 to-purple-800">
					<div className="flex flex-col items-center justify-center text-center">
						<h1 className="text-3xl lg:text-4xl font-bold mb-2 text-white">
							{t(["login", "title"])}
						</h1>
						<p className="text-lg text-white">{t(["login", "quote"])}</p>
						<img
							src={CouponImage2}
							alt="Coupon Graphic"
							className="w-56 lg:w-80"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
