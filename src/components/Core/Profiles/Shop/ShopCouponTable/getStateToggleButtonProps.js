import { CouponState } from "@/constants";

/**
 * Generates properties for a state toggle button based on its active status and coupon state.
 *
 * @param {boolean} active - Indicates whether the button is in an active state.
 * @param {CouponState} state - The current state of the coupon.
 * @returns {Object} The properties for the state toggle button.
 * @returns {string} return.text - The text to display on the button ("Pause" if active, "Start" if not).
 * @returns {string} return.colour - The colour of the button ("green-500" if active, "blue-500" if not).
 * @returns {boolean} return.disabled - Whether the button should be disabled (true if state is not Approved).
 */
const getStateToggleButtonProps = (active, state) => {
	return {
		text: active ? "Pause" : "Start",
		colour: active ? "green-500" : "blue-500",
		disabled: state !== CouponState.Approved,
	};
};

export default getStateToggleButtonProps;
