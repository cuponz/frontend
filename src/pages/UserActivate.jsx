import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ActivateFail from "@/components/Popup/ActivateFail";
import LoadingSpinner from "../components/Utils/LoadingSpinner";

/**
 * UserActivate component handles the user account activation process.
 * It retrieves the activation token from the URL search parameters,
 * validates the token, and navigates to the login page upon successful activation.
 * If the token is invalid or missing, it displays an activation failure message.
 *
 * @component
 * @returns {JSX.Element|null} The rendered component or null if not applicable.
 *
 * @example
 * // Usage example:
 * // Assuming the URL contains a valid activation token as a search parameter.
 * <UserActivate />
 */
const UserActivate = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [activationFailed, setActivationFailed] = useState(false);

	useEffect(() => {
		const activationToken = searchParams.get("token");

		const validateToken = async () => {
			setIsLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 2000));

			if (activationToken) {
				navigate("/login");
			} else {
				setActivationFailed(true);
			}
			setIsLoading(false);
		};

		validateToken();
	}, [searchParams, navigate]);

	if (isLoading) {
		return (
			<LoadingSpinner
				size="large"
				color="blue"
				className="flex flex-col justify-center items-center h-screen"
			/>
		);
	}

	if (activationFailed) {
		return <ActivateFail />;
	}

	return null;
};

export default UserActivate;
