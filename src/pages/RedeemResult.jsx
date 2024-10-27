import PopupRedeemSuccess from "@/components/Popup/RedeemSuccess";
import PopupRedeemFail from "@/components/Popup/RedeemFail";
import { useParams } from "react-router-dom";
import { getRedemptionsById } from "../api/redemptions";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/Utils/LoadingSpinner";
import { useUserStore } from "../store/user";
import { RedemptionState, UserType } from "../constants";

/**
 * Component to display the result notification of a redemption process.
 * It fetches redemption data based on the redeemId from the URL parameters
 * and displays appropriate messages based on the redemption state and user type.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * // Usage example:
 * <ResultNoti />
 *
 * @remarks
 * This component uses the `useParams` hook to get the redeemId from the URL,
 * the `useUserStore` hook to get the current user, and the `useQuery` hook
 * to fetch redemption data.
 *
 * @see {@link https://reactrouter.com/web/api/Hooks/useparams} for more about `useParams`.
 * @see {@link https://react-query.tanstack.com/reference/useQuery} for more about `useQuery`.
 */
function ResultNoti() {
	const { redeemId } = useParams();
	const user = useUserStore((state) => state.user);

	const { isPending, data } = useQuery({
		queryKey: ["redemptions", redeemId],
		queryFn: () => getRedemptionsById(redeemId),
		retry: false,
	});

	if (isPending) {
		return <LoadingSpinner />;
	}

	let error = undefined;
	let startDate = undefined;

	if (user.type === UserType.User) {
		error = "only-shop";
	} else if (!data) {
		error = "location";
	} else if (Date.now() > new Date(data.end_date)) {
		error = "expired";
	} else if (Date.now() < new Date(data.start_date)) {
		startDate = new Date(data.start_date).toDateString();
		error = "not-started";
	} else if (data.state === RedemptionState.Used) {
		error = "already-redeemed";
	}

	return (
		<div>
			<div className="pt-16 sm:px-6 ">
				{/* <PopupFail errorType="expired" couponId={1} /> */}
				{error && <PopupRedeemFail errorType={error} startDate={startDate} />}
				{!error && <PopupRedeemSuccess redeem={data} />}
			</div>
		</div>
	);
}

export default ResultNoti;
