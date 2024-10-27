import React from "react";

import { CouponState } from "@/constants";

/**
 * A memoized functional component that displays a status badge based on the provided `active` and `state` props.
 *
 * @component
 * @example
 * // Example usage:
 * // <StatusBadge active={true} state={CouponState.Pending} />
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.active - Indicates if the status is active.
 * @param {string} props.state - The state of the coupon, which determines the badge text and style.
 * @returns {JSX.Element} The rendered status badge.
 */
const StatusBadge = React.memo(({ active, state }) => {
	let text, style;

	switch (state) {
		case CouponState.Pending:
			text = "Pending";
			style = "bg-yellow-100 text-yellow-800";
			break;
		case CouponState.Rejected:
			text = "Rejected";
			style = "bg-red-100 text-red-800";
			break;
		default:
			text = active ? "Active" : "Paused";
			style = active
				? "bg-green-100 text-green-800"
				: "bg-gray-100 text-gray-800";
	}

	return (
		<span
			className={`px-2 py-1 w-16 inline-flex justify-center text-xs leading-5 font-semibold rounded-full ${style}`}
		>
			{text}
		</span>
	);
});

export default StatusBadge;
