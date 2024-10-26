import { CouponState } from "@/constants";

/**
 * Returns the properties for the state toggle button based on the given coupon state.
 *
 * @param {CouponState} state - The current state of the coupon.
 * @returns {Object} The properties for the state toggle button.
 * @returns {string} return.text - The text to be displayed on the button.
 * @returns {string} return.colour - The colour of the button.
 * @returns {boolean} return.disabled - Indicates whether the button is disabled.
 */
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
