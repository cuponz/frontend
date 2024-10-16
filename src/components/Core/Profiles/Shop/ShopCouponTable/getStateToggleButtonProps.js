import { CouponState } from "@/constants";

const getStateToggleButtonProps = (active, state) => {
	return {
		text: active ? "Pause" : "Start",
		colour: active ? "green-500" : "blue-500",
		disabled: state !== CouponState.Approved,
	};
};

export default getStateToggleButtonProps;
