import React from "react";

/**
 * ShopBadge component displays a badge indicating the approval status.
 *
 * @component
 * @example
 * // Usage example:
 * <ShopBadge approved={true} />
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.approved - Approval status to determine the badge text and style.
 * @returns {JSX.Element} A styled badge indicating "Approved" or "Rejected".
 */
const ShopBadge = React.memo(({ approved }) => {
	let text, style;

	if (approved) {
		text = "Approved";
		style = "bg-green-100 text-green-800";
	} else {
		text = "Rejected";
		style = "bg-red-100 text-red-800";
	}

	return (
		<span
			className={`px-2 py-1 w-16 inline-flex justify-center text-xs leading-5 font-semibold rounded-full ${style}`}
		>
			{text}
		</span>
	);
});

export default ShopBadge;
