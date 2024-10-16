import React from "react";

import { CouponState } from "@/constants";

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