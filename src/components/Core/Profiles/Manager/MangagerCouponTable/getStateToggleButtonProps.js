import { CouponState } from "@/constants";

const getStateToggleButtonProps = (state) => {
	switch (state) {
		case CouponState.Pending:
		case CouponState.Rejected:
			return {
				text: "Approve",
				colour: "green-500",
				disabled: false,
			};
		default:
			return {
				text: "Reject",
				colour: "yellow-500",
				disabled: false,
			};
	}
};

export default getStateToggleButtonProps;
