import { Link } from "react-router-dom";
import Layout from "@/layout/Layout";

export default function ErrorPage() {
	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<div className="text-center">
				<h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
				<p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
				<Link
					to="/"
					className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
				>
					Go Back Home
				</Link>
			</div>
		</div>
	);
}
