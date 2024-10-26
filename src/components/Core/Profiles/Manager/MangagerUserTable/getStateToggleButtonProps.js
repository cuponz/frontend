/**
 * Returns the properties for a toggle button based on the approval state.
 *
 * @param {boolean} approved - The approval state.
 * @returns {Object} The properties for the toggle button.
 * @returns {string} return.text - The text to display on the button.
 * @returns {string} return.colour - The colour of the button.
 * @returns {boolean} return.disabled - The disabled state of the button.
 */
const getStateToggleButtonProps = (approved) => {
	return approved
		? {
				text: "Reject",
				colour: "yellow-500",
				disabled: false,
			}
		: {
				text: "Approve",
				colour: "green-500",
				disabled: false,
			};
};

export default getStateToggleButtonProps;
