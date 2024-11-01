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

/**
 * @typedef {Object} CouponCardActionButtonProps
 * @property {('all'|'shoplist'|'shopmanage'|'managermanage'|'user')} type - Type of coupon catalogue view
 * @property {Function} [onAction] - Callback function when button is clicked
 * @property {boolean} [isRedeemed=false] - Whether the coupon is redeemed
 * @property {boolean} [isUsed=false] - Whether the coupon is used
 */

/**
 * Renders an action button for the coupon card with different states based on the catalogue type
 * and user type.
 *
 * @component
 * @param {CouponCardActionButtonProps} props - Component props
 * @returns {JSX.Element|null} Action button element or null if not applicable
 */
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
 * @typedef {Object} CouponData
 * @property {string} id - Unique identifier for the coupon
 * @property {string} code - The coupon code
 * @property {string} logo_url - URL of the coupon logo
 * @property {string} name - Name/title of the coupon
 * @property {string} desc - Description of the coupon
 * @property {string} keywords - Comma-separated keywords
 * @property {string} start_date - Start date in ISO format
 * @property {string} end_date - End date in ISO format
 * @property {string} shop - Shop identifier
 * @property {string} category_name - Category name
 * @property {number} max_usage - Maximum number of times coupon can be used
 * @property {number} usage_count - Current number of times coupon has been used
 * @property {number} redeemed_count - Number of users who redeemed the coupon
 * @property {string} redemption_state - Current redemption state
 */

/**
 * @typedef {Object} CouponModalState
 * @property {string|null} modalType - Current modal type being displayed
 */

/**
 * Handles closing of any open modal
 *
 * @returns {void}
 */

/**
 * Handles primary action button click based on catalogue type
 * Shows appropriate modal or triggers stats callback
 *
 * @returns {void}
 */

/**
 * Format date string to locale date format
 *
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */

/**
 * Parse keywords string into array
 *
 * @param {string} keywordString - Comma separated keywords
 * @returns {string[]} Array of keyword strings
 */

/**
 * @typedef {Object} CouponCardUIConfig
 * @property {boolean} showRemainingCount - Whether to show remaining coupon count
 * @property {boolean} showUserCount - Whether to show number of users who redeemed
 * @property {Object} imageConfig - Image display configuration
 * @property {string} imageConfig.size - Image size classes
 * @property {string} imageConfig.objectFit - Image object-fit style
 */

/**
 * CouponCard component displays detailed information about a coupon and handles
 * various actions based on the type of coupon catalogue.
 *
 * @component
 * @param {Object} props - Component props
 * @param {CouponData} props.coupon - The coupon data object
 * @param {('all'|'shoplist'|'shopmanage'|'managermanage'|'user')} props.type - Type of coupon catalogue view
 * @param {Function} props.onShowStats - Callback to display coupon statistics
 * @returns {JSX.Element} Rendered coupon card
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
