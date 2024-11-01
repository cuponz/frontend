import LoadingSpinner from "../../Utils/LoadingSpinner"; // Import the new component

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import FilterBoard from "./FilterBoard";
import InstructionPopup from "../../Popup/InstructionPopup";
import { CiFilter } from "react-icons/ci";
import { useCouponFiltersStore } from "../../../store/filters";
import { updateFiltersFromParams } from "../../Utils/Coupons";
import { CiSearch } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import CouponBoard from "./CouponBoard";
import { CouponCatalogueType } from "@/constants";
import UserTable from "../Profiles/Shop/UserTable";
import { useTranslations } from "@/store/languages";

import {
	getCoupons,
	getCouponsByShopIdFromShop,
	getCouponsByShopIdFromOthers,
} from "@/api/coupon";
import { getRedemptionsByUserId } from "@/api/redemptions";

/**
 * @typedef {Object} CouponCatalogueBoardProps
 * @property {('all'|'shoplist'|'shopmanage'|'managermanage'|'user')} type - Type of coupon catalogue view
 * @property {Function} setShowUserTable - Callback to toggle user table visibility
 * @property {Function} setSelectedCouponId - Callback to set selected coupon ID
 */

/**
 * Renders the main coupon board with data fetching logic based on catalogue type
 *
 * @component
 * @param {CouponCatalogueBoardProps} props - Component props
 * @returns {JSX.Element} Rendered coupon board or loading spinner
 */
const CouponCatalogueBoard = ({
	type,
	setShowUserTable,
	setSelectedCouponId,
}) => {
	const [searchParams] = useSearchParams();
	const id = searchParams.get("id");

	let [queryKey, queryFn] = useMemo(() => {
		let queryKey, queryFn;

		switch (type) {
			case CouponCatalogueType.All:
				queryKey = ["get", "coupons"];
				queryFn = getCoupons;
				break;
			case CouponCatalogueType.ShopManage:
				queryKey = ["get", "coupons", "shop"];
				queryFn = getCouponsByShopIdFromShop;
				break;
			case CouponCatalogueType.ManagerManage:
				queryKey = ["get", "coupons", "manage"];
				queryFn = getCoupons;
				break;
			case CouponCatalogueType.ShopList:
				queryKey = ["get", "coupons", "shop", id];
				queryFn = () => getCouponsByShopIdFromOthers(id);
				break;
			case CouponCatalogueType.User:
				queryKey = ["get", "user", "coupons"];
				queryFn = getRedemptionsByUserId;
				break;
		}

		return [queryKey, queryFn];
	}, [type, id]);

	const { isPending, data } = useQuery({
		queryKey,
		queryFn,
		retry: false,
	});

	if (isPending) {
		return <LoadingSpinner />;
	}

	return (
		<CouponBoard
			key={`type-id`}
			coupons={data}
			type={type}
			setShowUserTable={setShowUserTable}
			setSelectedCouponId={setSelectedCouponId}
		/>
	);
};

/**
 * CouponCatalogue component renders a catalogue of coupons with filtering and search functionalities.
 * It also manages the state for displaying a user table and a popup.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.type - The type of the coupon catalogue
 * @returns {JSX.Element} The rendered CouponCatalogue component
 */
const CouponCatalogue = ({ type }) => {
	const { t } = useTranslations();
	const [isFilterBoardVisible, setIsFilterBoardVisible] = useState(false);
	const [showPopup, setShowPopup] = useState(true);
	const [showUserTable, setShowUserTable] = useState(false);
	const [selectedCouponId, setSelectedCouponId] = useState(null);

	const [searchParams] = useSearchParams();

	const [setStartDate, setEndDate, setSelectedCategories, setSearchTerm] =
		useCouponFiltersStore((state) => [
			state.setStartDate,
			state.setEndDate,
			state.setSelectedCategories,
			state.setSearchTerm,
		]);

	useEffect(() => {
		updateFiltersFromParams(
			searchParams,
			setStartDate,
			setEndDate,
			setSelectedCategories,
		);
	}, [searchParams]);

	useEffect(() => {
		// Scroll to the top of the page when toggle user table
		window.scrollTo(0, 0);
	}, [showUserTable]);

	const handlePopupClose = () => {
		setShowPopup(false);
	};

	/**
	 * Handles search input changes
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} e - Change event
	 * @returns {void}
	 */
	const handleSearchChange = useCallback(
		(e) => setSearchTerm(e.target.value),
		[],
	);

	/**
	 * Toggles filter board visibility and body scroll
	 *
	 * @returns {void}
	 */
	const toggleFilterBoard = () => {
		setIsFilterBoardVisible(!isFilterBoardVisible);
		document.body.style.overflow = isFilterBoardVisible ? "auto" : "hidden";
	};

	/**
	 * Handles navigation back from user table view
	 *
	 * @returns {void}
	 */
	const handleBack = () => {
		setShowUserTable(false);
		setSelectedCouponId(null);
	};

	if (showUserTable && selectedCouponId) {
		return <UserTable couponId={selectedCouponId} onBack={handleBack} />;
	}

	return (
		<>
			<div className="flex items-center justify-between mb-4 mt-5">
				<div>
					<button
						onClick={toggleFilterBoard}
						className="bg-yellow-500 text-gray-800 px-4 py-2 rounded-md shadow-lg hover:bg-yellow-600 focus:outline-none flex items-center"
					>
						{t(["filter", "display"])}
						<CiFilter className="ml-2" />
					</button>
				</div>
				<div className="ml-4 relative">
					<input
						type="text"
						placeholder="Search coupons..."
						onChange={handleSearchChange}
						className="w-64 px-4 py-2 pr-10 border-2 border-yellow-600 rounded-md shadow-md focus:outline-none focus:border-blue-500"
					/>
					<CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
				</div>
			</div>

			{showPopup && <InstructionPopup onClose={handlePopupClose} />}

			{isFilterBoardVisible && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40"
					onClick={toggleFilterBoard}
				></div>
			)}

			<div
				className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 transform ${
					isFilterBoardVisible ? "translate-x-0" : "-translate-x-full"
				}`}
				style={{ width: "70%", maxWidth: "300px" }}
			>
				{isFilterBoardVisible && (
					<FilterBoard closeFilterBoard={toggleFilterBoard} />
				)}
			</div>

			<CouponCatalogueBoard
				type={type}
				setShowUserTable={setShowUserTable}
				setSelectedCouponId={setSelectedCouponId}
			/>
		</>
	);
};

export default CouponCatalogue;
