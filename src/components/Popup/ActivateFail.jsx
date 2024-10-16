import { Link } from "react-router-dom";

const ActivateFail = () => {
	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
				<h2 className="text-2xl font-bold mb-4 text-red-600">
					Activation Failed
				</h2>
				<p className="mb-6 text-gray-700">
					We're sorry, but we couldn't activate your account. The activation
					link may be invalid or expired.
				</p>
				<div className="flex justify-between">
					<Link
						to="/register"
						className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
					>
						Sign Up Again
					</Link>
					<Link
						to="/login"
						className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
					>
						Back to Login
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ActivateFail;
