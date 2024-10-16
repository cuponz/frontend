import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ActivateFail from "@/components/Popup/ActivateFail";
import LoadingSpinner from "../components/Utils/LoadingSpinner";

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
