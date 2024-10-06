import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

import { useUserStore } from "@/store/user";
import { userAuth } from "@/api/user";

import Layout from "@/layout/Layout";
import LoadingSpinner from "../../components/Utils/LoadingSpinner"; // Ensure this path is correct

const MINIMUM_LOADING_TIME = 3000; // 3 seconds

const AuthWrapper = ({ isProtected }) => {
	const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

	const { isPending, isError, isFetched, data, error } = useQuery({
		queryKey: ["auth"],
		queryFn: userAuth,
		retry: false,
		enabled: !user,
	});

	useEffect(() => {
		let timer;
		if (isFetched) {
			timer = setTimeout(() => {
				setIsLoading(false);
			}, MINIMUM_LOADING_TIME);
		}
		return () => clearTimeout(timer);
	}, [isFetched]);

	useEffect(() => {
		if (isProtected && isFetched && !data) {
			setUser(undefined);
			navigate("/login");
		}
	}, [isProtected, isFetched, data]);

	useEffect(() => {
		if (data) {
			console.log(data.user);
			toast.success("Logged in");
			setUser(data.user);
		}
		if (isError) {
			toast.error(error?.message || "Authentication error");
			setUser(undefined);
			if (isProtected) {
				navigate("/login");
			}
		}
	}, [data, error]);

	if (isPending || isLoading) {
		return (
			<Layout>
				<div className="flex flex-col justify-center items-center h-screen">
					<LoadingSpinner size="large" color="blue" />
					<p className="mt-4 text-lg text-gray-600">
						Please wait while we verify your credentials...
					</p>
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<Outlet />
		</Layout>
	);
};

export default AuthWrapper;
