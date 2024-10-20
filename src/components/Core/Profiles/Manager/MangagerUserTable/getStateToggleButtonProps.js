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
