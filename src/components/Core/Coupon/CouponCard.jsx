import {
	CouponCardModalType,
	CouponCatalogueType,
	RedemptionState,
} from "@/constants";
import { useState } from "react";

import CouponPopup from "./CouponPopup";
import InfoField from "./InfoField";
import { useUserStore } from "@/store/user";
import { UserType } from "@/constants";

const CouponCardActionButton = ({
	type,
	onAction,
	isRedeemed = false,
	isUsed = false,
}) => {
	let text;

	switch (type) {
		case CouponCatalogueType.All:
		case CouponCatalogueType.ShopList:
			text = isRedeemed ? "Redeemed" : "Redeem Now";
			break;
		case CouponCatalogueType.ShopManage:
			text = "Show Details";
			break;
		case CouponCatalogueType.User:
			text = isUsed ? "Used" : "Use Now";
			break;
	}

	return (
		<div className="mt-auto">
			<button
				onClick={onAction}
				disabled={isUsed || isRedeemed}
				className={`px-4 py-2 rounded-md w-full text-white ${
					isUsed || isRedeemed
						? "bg-gray-400 cursor-not-allowed"
						: "bg-[#46467A] hover:bg-green-700"
				}`}
			>
				{text}
			</button>
		</div>
	);
};

const CouponCard = ({ coupon, type, onShowStats }) => {
	const [modalType, setModalType] = useState(null);
	const user = useUserStore((state) => state.user);

	let {
		code,
		logo_url: logo,
		name,
		desc: description,
		keywords,
		start_date: startDate,
		end_date: endDate,
		shop,
		category_name: categoryName,
		max_usage: maxUsage,
		usage_count: usageCount,
		redeemed_count: numUsers,
		state,
	} = coupon;

	keywords = keywords.split(",");

	startDate = new Date(startDate).toLocaleDateString();
	endDate = new Date(endDate).toLocaleDateString();

	const handleClose = () => {
		setModalType(null);
	};

	const handleAction = () => {
		switch (type) {
			case CouponCatalogueType.All:
			case CouponCatalogueType.ShopList:
				setModalType(CouponCardModalType.InfoField);
				break;
			case CouponCatalogueType.ShopManage:
				onShowStats(coupon.id);
				break;
			case CouponCatalogueType.User:
				if (coupon.state !== RedemptionState.Used) {
					setModalType(CouponCardModalType.PopUp);
				}
				break;
			default:
				break;
		}
	};

	return (
		<div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between h-full relative">
			{(type === CouponCatalogueType.All ||
				type === CouponCatalogueType.ShopList) &&
				maxUsage && (
					<div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-bl-lg">
						{maxUsage - usageCount} coupons left!
					</div>
				)}

			{type === CouponCatalogueType.ShopManage && (
				<div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-bl-lg">
					{numUsers} Users
				</div>
			)}

			<div className="flex flex-col items-center text-center mb-4 flex-grow">
				<div className="mb-4">
					<img
						src={logo}
						alt={name}
						className="sm:w-48 md:w-96 h-96 object-contain"
					/>
				</div>
				{code && (
					<h1 className="text-3xl font-semibold font-mono mb-3 transition-all tracking-wide hover:tracking-widest hover:text-[#46467A]">
						{code}
					</h1>
				)}
				<h2 className="text-lg font-semibold mb-1">{name}</h2>
				<p className="text-gray-700 text-sm mb-2">{shop}</p>
				<p className="mt-2 text-gray-600 text-sm">{categoryName}</p>
				<p className="mt-2 text-gray-600 text-sm">{description}</p>
				<p className="mt-2 text-gray-600 text-sm">
					<strong>Time:</strong> {startDate} to {endDate}
				</p>

				{keywords && keywords.length > 0 && (
					<p className="mt-2 text-gray-500">
						<strong>Keywords:</strong> {keywords.join(", ")}
					</p>
				)}
			</div>

			{(!user || user.type === UserType.User) && (
				<CouponCardActionButton
					type={type}
					onAction={handleAction}
					isUsed={state === RedemptionState.Used}
				/>
			)}

			{modalType === CouponCardModalType.InfoField && (
				<InfoField
					onClose={handleClose}
					coupon={coupon}
					onRedeem={() => setModalType(null)}
				/>
			)}

			{modalType === CouponCardModalType.PopUp && (
				<CouponPopup coupon={coupon} onClose={handleClose} />
			)}
		</div>
	);
};

export default CouponCard;
