// UserInfoOptions.js
import React from "react";
import { CouponRequirementType } from "@/constants";
import { useTranslations } from "@/store/languages";
const userInfoOptions = {
	Email: "Email",
	PhoneNumber: "Phone Number",
	EmailOrPhoneNumber: "Email or Phone Number",
	EmailAndPhoneNumber: "Email and Phone Number",
};

const UserInfoOptions = ({ formData, handleChange, tier }) => {
	console.log(tier)
	const { t } = useTranslations();
	return (
		<div className="mb-4">
			<label className="block text-sm font-medium text-gray-700">
				{t(["UserInfoOptions", "content"])}
			</label>
			<div className="mt-2 space-x-4">
				{Object.entries(userInfoOptions)
					.filter(([key]) => CouponRequirementType[key] <= tier)
					.map(([key, value]) => (
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
