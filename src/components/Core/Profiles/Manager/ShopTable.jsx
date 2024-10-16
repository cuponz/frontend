import { getRedemptionsByCouponId } from "../../../../api/redemptions";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Utils/LoadingSpinner";
import DataTable from "../../../Wrapper/DataTable";
import { RedemptionState } from "../../../../constants";
import { useMemo } from "react";

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
				filename={`redemptions_coupon_${couponId}.csv`}
			/>
		</div>
	);
};

export default UserTable;
