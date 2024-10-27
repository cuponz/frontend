import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

const Layout = lazy(() => import("@/layout/Layout"));
import LoadingSpinner from "@/components/Utils/LoadingSpinner"; // Ensure this path is correct

/**
 * RouteWrapper component that wraps routes with a layout and suspense fallback.
 *
 * This component uses React's Suspense to display a loading spinner and message
 * while the child components are being loaded. It also wraps the child components
 * with a Layout component.
 *
 * @component
 * @example
 * return (
 *   <RouteWrapper />
 * )
 */
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
