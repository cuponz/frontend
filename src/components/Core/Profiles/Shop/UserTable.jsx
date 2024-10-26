import { getRedemptionsByCouponId } from "@/api/redemptions";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/Utils/LoadingSpinner";
import DataTable from "@/components/Wrapper/DataTable";
import { RedemptionState } from "@/constants";
import { useMemo } from "react";

/**
 * UserTable component fetches and displays user redemption details for a given coupon.
 *
 * @param {Object} props - The component props.
 * @param {string} props.couponId - The ID of the coupon to fetch redemptions for.
 * @param {Function} props.onBack - Callback function to handle the back button click.
 *
 * @returns {JSX.Element} The rendered component.
 */
const UserTable = ({ couponId, onBack }) => {
	const { isLoading, error, data } = useQuery({
		queryKey: ["get", "redemptions", couponId],
		queryFn: () => getRedemptionsByCouponId(couponId),
		retry: false,
	});

	const columns = [
		{ header: "Username", accessor: "user_name" },
		{ header: "Email", accessor: "user_email" },
		{ header: "Phone Number", accessor: "user_phone" },
		{ header: "Redeem State", accessor: "redeem_state" },
	];

	const redemptions = useMemo(() => {
		if (!data) {
			return [];
		}

		const RedemptionStateKeys = Object.keys(RedemptionState);

		return data.map((redemption) => {
			redemption.redeem_state = RedemptionStateKeys[redemption.state];
			return redemption;
		});
	}, [data]);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		throw error;
	}

	return (
		<div className="p-4">
			<button
				className="px-4 py-2 mb-4 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600"
				onClick={onBack}
			>
				Back
			</button>
			<DataTable
				columns={columns}
				data={redemptions}
				name={`User Details of Coupon ${couponId}`}
				filename={`redemptions_coupon_${couponId}`}
			/>
		</div>
	);
};

export default UserTable;
