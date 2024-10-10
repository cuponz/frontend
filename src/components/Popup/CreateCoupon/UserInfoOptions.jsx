// UserInfoOptions.js
import React from "react";
import { CouponRequirementType } from "@/constants";

const userInfoOptions = {
	Email: "Email",
	PhoneNumber: "Phone Number",
	EmailOrPhoneNumber: "Email or Phone Number",
	EmailAndPhoneNumber: "Email and Phone Number",
};

const UserInfoOptions = ({ formData, handleChange }) => {
	return (
		<div className="mb-4">
			<label className="block text-sm font-medium text-gray-700">
				User Information Required
			</label>
			<div className="mt-2 space-x-4">
				{Object.entries(userInfoOptions).map(([key, value]) => (
					<label key={key} className="inline-flex items-center">
						<input
							type="radio"
							name="type"
							value={CouponRequirementType[key]}
							checked={Number(formData.type) === CouponRequirementType[key]}
							onChange={handleChange}
							className="form-radio"
						/>
						<span className="ml-2">{value}</span>
					</label>
				))}
			</div>
		</div>
	);
};

export default UserInfoOptions;
