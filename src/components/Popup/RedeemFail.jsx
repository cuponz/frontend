import { FaExclamation } from "react-icons/fa";
import { useTranslations } from "@/store/languages";

/**
 * PopupRedeemFail component displays a popup with an error message based on the error type.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.errorType - The type of error to display.
 * @param {string} [props.startDate] - The start date to display if the error type is "not-started".
 * @returns {JSX.Element} The rendered component.
 */
const PopupRedeemFail = ({ errorType, startDate }) => {
	const { t } = useTranslations();
	const getErrorMessage = () => {
		switch (errorType) {
			case "only-shop":
				return t(["Fail", "onlyShop"]);
			case "already-redeemed":
				return t(["Fail", "alreadyRedeemed"]);
			case "expired":
				return t(["Fail", "expired"]);
			case "not-started":
				return startDate
					? `${t(["Fail", "notStarted"])} ${startDate}`
					: t(["Fail", "notStarted2"]);
			case "location":
				return t(["Fail", "location"]);
			default:
				return t(["Fail", "location2"]);
		}
	};

	return (
		<div className="fixed inset-0 flex justify-center items-center">
			<div className="bg-white p-6 rounded-lg w-full max-w-sm">
				<div className="flex items-center justify-center mb-4">
					<div className="bg-red-500 rounded-full p-4 m-3">
						{/* svg delete */}

						<FaExclamation className="text-4xl text-white" />
					</div>
				</div>
				<h2 className="text-xl font-semibold mb-4 text-center">
					{t(["Fail", "failed"])};
				</h2>
				<p className="text-center text-gray-700">{getErrorMessage()}</p>
			</div>
		</div>
	);
};

export default PopupRedeemFail;
