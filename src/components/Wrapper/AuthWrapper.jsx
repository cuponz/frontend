import { useEffect, Suspense, lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

import { useUserStore } from "@/store/user";
import { userAuth } from "@/api/user";

const Layout = lazy(() => import("@/layout/Layout"));
import LoadingSpinner from "@/components/Utils/LoadingSpinner";

const AuthWrapper = ({ isProtected }) => {
	const [user, setUser, deleteUserCache] = useUserStore((state) => [state.user, state.setUser, state.deleteUserCache]);
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
	}, [isProtected, isFetched, data, navigate, setUser]);

	useEffect(() => {
		if (data) {
			toast.success("Logged in");
			setUser(data.user);
		}
		if (isError) {
			toast.error(error?.message || "Authentication error");
			deleteUserCache();
			if (isProtected) {
				navigate("/login");
			}
		}
	}, [data, error, isError, isProtected, navigate, setUser]);

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
			<Layout>
				<Outlet />
			</Layout>
		</Suspense>
	);
};

export default AuthWrapper;
