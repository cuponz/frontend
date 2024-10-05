import LoadingSpinner from "../../Utils/LoadingSpinner"; // Import the new component

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import FilterBoard from "./FilterBoard";
import InstructionPopup from "../../InstructionPopup";

import { useCouponFiltersStore } from "../../../store/filters";
import { updateFiltersFromParams } from "../../Utils/Coupons";

import { useQuery } from "@tanstack/react-query";
import CouponBoard from "./CouponBoard";
import { CouponCatalougeType } from "../../../constants";
import UserTable from "../Profiles/Shop/UserTable";
import { useTranslations } from "../../../store/languages";

import {
	getCoupons,
	getCouponsByShopIdFromShop,
	getCouponsByShopIdFromOthers,
} from "../../../api/coupon";
import { getRedemptionsByUserId } from "../../../api/redemptions";
import { useUserStore } from "../../../store/user";

const CouponCatalogueBoard = ({
	type,
	setShowUserTable,
	setSelectedCouponId,
}) => {
	const user = useUserStore((state) => state.user);

	let [queryKey, queryFn] = useMemo(() => {
		let queryKey, queryFn;
		switch (type) {
			case CouponCatalougeType.All:
				queryKey = ["get", "coupons"];
				queryFn = getCoupons;
				break;
			case CouponCatalougeType.ShopManage:
				queryKey = ["get", "coupons", "shop"];
				queryFn = getCouponsByShopIdFromShop;
				break;
			case CouponCatalougeType.ShopList:
				queryKey = ["get", "coupons", "shop", user.id];
				queryFn = () => getCouponsByShopIdFromOthers(user.id);
				break;
			case CouponCatalougeType.User:
				queryKey = ["get", "user", "coupons"];
				queryFn = getRedemptionsByUserId;
				break;
		}

		return [queryKey, queryFn];
	}, [type]);

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
			coupons={data}
			type={type}
			setShowUserTable={setShowUserTable}
			setSelectedCouponId={setSelectedCouponId}
		/>
	);
};

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
			setSelectedCategories
		);
	}, [searchParams]);

	useEffect(() => {
		// Scroll to the top of the page when toggle user table
		window.scrollTo(0, 0);
	}, [showUserTable]);

	const handlePopupClose = () => {
		setShowPopup(false);
	};

	const handleSearchChange = useCallback(
		(e) => setSearchTerm(e.target.value),
		[]
	);

	const toggleFilterBoard = () => {
		setIsFilterBoardVisible(!isFilterBoardVisible);
		document.body.style.overflow = isFilterBoardVisible ? "auto" : "hidden";
	};

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
						<i className="pl-2 fa-solid fa-caret-down"></i>
					</button>
				</div>
				<div className="ml-4">
					<input
						type="text"
						placeholder="Search coupons..."
						onChange={handleSearchChange}
						className="w-64 px-4 py-2 border-2 border-yellow-600 rounded-md shadow-md focus:outline-none focus:border-blue-500"
					/>
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
