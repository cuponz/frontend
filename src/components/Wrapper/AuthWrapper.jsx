import { useEffect, Suspense, lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

import { useUserStore } from "@/store/user";
import { userAuth } from "@/api/user";

const Layout = lazy(() => import("@/layout/Layout"));
import LoadingSpinner from "@/components/Utils/LoadingSpinner";

/**
 * AuthWrapper component that handles user authentication and navigation.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.isProtected - Flag indicating if the route is protected.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <AuthWrapper isProtected={true} />
 *
 * @description
 * This component uses the `useUserStore` hook to manage user state and the `useQuery` hook to fetch authentication data.
 * It handles navigation to the login page if the user is not authenticated and the route is protected.
 * It also displays a loading spinner while authentication is pending.
 */
const AuthWrapper = ({ isProtected }) => {
	const [user, setUser, deleteUserCache] = useUserStore((state) => [
		state.user,
		state.setUser,
		state.deleteUserCache,
	]);
	const navigate = useNavigate();

	const { isPending, isError, isFetched, data, error } = useQuery({
		queryKey: ["auth"],
		queryFn: userAuth,
		retry: false,
		enabled: !user,
	});

	useEffect(() => {
		if (isProtected && isFetched && !data) {
			deleteUserCache();
			navigate("/login");
		}
	}, [isProtected, isFetched, data]);

	useEffect(() => {
		if (data) {
			toast.success("Logged in");
			setUser(data.user);
		}
		if (isError) {
			if (error?.message) {
				toast.error(error?.message);
			}
			console.log(error);
			deleteUserCache();
			if (isProtected) {
				navigate("/login");
			}
		}
	}, [data, error, isError, isProtected]);

	if (isPending) {
		return (
			<div className="flex flex-col justify-center items-center h-screen">
				<LoadingSpinner size="large" color="blue" />
				<p className="mt-4 text-lg text-gray-600">
					Verifying your credentials...
				</p>
			</div>
		);
	}

	return (
		<Suspense
			fallback={
				<div className="flex flex-col justify-center items-center h-screen">
					<LoadingSpinner size="large" color="blue" />
					<p className="mt-4 text-lg text-gray-600">Loading...</p>
				</div>
			}
		>
			<Layout isProtected={isProtected}>
				<Outlet />
			</Layout>
		</Suspense>
	);
};

export default AuthWrapper;
