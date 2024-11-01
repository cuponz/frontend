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

import Button from "@/components/Utils/Button";

const CouponCardActionButton = ({
	type,
	onAction,
	isRedeemed = false,
	isUsed = false,
}) => {
	const user = useUserStore((state) => state.user);

	let text;

	switch (type) {
		case CouponCatalogueType.All:
		case CouponCatalogueType.ShopList:
			if (user && user.type !== UserType.User) {
				return null;
			}
			text = isRedeemed ? "Redeemed" : "Redeem Now";
			break;
		case CouponCatalogueType.ShopManage:
		case CouponCatalogueType.ManagerManage:
			text = "Show Details";
			break;
		case CouponCatalogueType.User:
			text = isUsed ? "Used" : "Use Now";
			break;
	}

	return (
		<>
			{onAction ? (
				<div className="mt-auto">
					<Button
						onClick={onAction}
						disabled={isUsed || isRedeemed}
						className="w-full"
						colour="blue-500"
					>
						{text}
					</Button>
				</div>
			) : (
				<></>
			)}
		</>
	);
};

/**
 * CouponCard component displays detailed information about a coupon and handles various actions based on the type of coupon catalogue.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.coupon - The coupon data.
 * @param {string} props.coupon.code - The coupon code.
 * @param {string} props.coupon.logo_url - The URL of the coupon logo.
 * @param {string} props.coupon.name - The name of the coupon.
 * @param {string} props.coupon.desc - The description of the coupon.
 * @param {string} props.coupon.keywords - The keywords associated with the coupon.
 * @param {string} props.coupon.start_date - The start date of the coupon.
 * @param {string} props.coupon.end_date - The end date of the coupon.
 * @param {string} props.coupon.shop - The shop associated with the coupon.
 * @param {string} props.coupon.category_name - The category name of the coupon.
 * @param {number} props.coupon.max_usage - The maximum usage of the coupon.
 * @param {number} props.coupon.usage_count - The current usage count of the coupon.
 * @param {number} props.coupon.redeemed_count - The number of users who have redeemed the coupon.
 * @param {string} props.coupon.redemption_state - The redemption state of the coupon.
 * @param {string} props.type - The type of the coupon catalogue.
 * @param {function} props.onShowStats - The function to call when showing statistics for the coupon.
 * @returns {JSX.Element} The rendered CouponCard component.
 */
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
		redemption_state: redemptionState,
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
			case CouponCatalogueType.ManagerManage:
				onShowStats(coupon.id);
				break;
			case CouponCatalogueType.User:
				if (coupon.redemption_state !== RedemptionState.Used) {
					setModalType(CouponCardModalType.PopUp);
				}
				break;
			default:
				break;
		}
	};

	return (
		<div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between h-full relative">
			{Boolean(
				(type === CouponCatalogueType.All ||
					type === CouponCatalogueType.ShopList) &&
					maxUsage,
			) && (
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

			<CouponCardActionButton
				type={type}
				onAction={handleAction}
				isUsed={redemptionState === RedemptionState.Used}
			/>

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
