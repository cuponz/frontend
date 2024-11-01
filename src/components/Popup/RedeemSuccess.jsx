import { useQuery } from "@tanstack/react-query";
import { usingRedemptionById } from "../../api/redemptions";
import LoadingSpinner from "../Utils/LoadingSpinner";
import { FaCheck } from "react-icons/fa";
import { useTranslations } from "@/store/languages";

/**
 * PopupRedeemSuccess component displays a success message after a redemption is successfully processed.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.redeem - The redemption object.
 * @param {string} props.redeem.redemption_id - The ID of the redemption.
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * const redeem = { redemption_id: '12345' };
 * return <PopupRedeemSuccess redeem={redeem} />;
 */
const PopupRedeemSuccess = ({ redeem }) => {
	const { t } = useTranslations();
	const { isPending, data } = useQuery({
		queryKey: ["redemptions", "using", redeem.redemption_id],
		queryFn: () => usingRedemptionById(redeem.redemption_id),
		retry: false,
	});

	if (isPending) {
		return <LoadingSpinner />;
	}

	return (
		<div className="fixed inset-0 flex justify-center items-center">
			<div className="bg-white p-6 rounded-lg w-full max-w-sm">
				<div className="flex items-center justify-center mb-4">
					<div className="bg-green-500 rounded-full p-4 m-3">
						{/* svg delete */}
						<FaCheck className="text-4xl text-white" />
					</div>
				</div>
				<h2 className="text-3xl font-semibold mb-4 text-center">
					{t(["success", "content"])}
				</h2>
				<div className="mt-6">
					<h3 className="text-lg font-semibold text-center">{data.title}</h3>
					<div className="mt-2">
						<p>
							<span className="font-semibold">{t(["success", "span"])}</span>{" "}
							{data.category}
						</p>
						<p>
							<span className="font-semibold">{t(["success", "span1"])}</span>{" "}
							{data.shop}
						</p>
						<p>
							<span className="font-semibold">{t(["success", "span2"])}</span>{" "}
							{data.code}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PopupRedeemSuccess;
