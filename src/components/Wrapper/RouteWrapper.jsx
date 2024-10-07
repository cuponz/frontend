import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

const Layout = lazy(() => import("@/layout/Layout"));
import LoadingSpinner from "@/components/Utils/LoadingSpinner"; // Ensure this path is correct

const RouteWrapper = () => {
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

export default RouteWrapper;
