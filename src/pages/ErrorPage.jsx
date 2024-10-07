import { Suspense } from "react";
import { Link } from "react-router-dom";
import Layout from "@/layout/Layout";
import LoadingSpinner from "@/components/Utils/LoadingSpinner";

export default function ErrorPage() {
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
				<div className="flex flex-col gap-2">
					404 Not Found
					<Link to="/">Home</Link>
				</div>
			</Layout>
		</Suspense>
	);
}
