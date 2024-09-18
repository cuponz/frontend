import LoadingSpinner from "../../Utils/LoadingSpinner"; // Import the new component

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import FilterBoard from "./FilterBoard";
import InstructionPopup from "../../InstructionPopup";

import { useCouponFiltersStore } from "../../../store/filters";
import { updateFiltersFromParams } from "../../Utils/Coupons";

import { useQuery } from "@tanstack/react-query";
import { getCoupons } from "../../../api/coupon";
import CouponBoard from "./CouponBoard";
import { CouponCatalougeType } from "../../../constants";

const AllCouponBoard = () => {
	const { isPending, data } = useQuery({
		queryKey: ["get", "coupons"],
		queryFn: getCoupons,
		retry: false,
	});

	return <CouponBoard isPending={isPending} coupons={data} />
};

const ShopManageCouponBoard = () => {
	const { isPending, data } = useQuery({
		queryKey: ["get", "coupons"],
		queryFn: getCoupons,
		retry: false,
	});

	return <CouponBoard isPending={isPending} coupons={data} />
};

const ShopListCouponBoard = () => {
	const { isPending, data } = useQuery({
		queryKey: ["get", "coupons"],
		queryFn: getCoupons,
		retry: false,
	});

	return <CouponBoard isPending={isPending} coupons={data} />
};

const UserCouponBoard = () => {
	const { isPending, data } = useQuery({
		queryKey: ["get", "coupons"],
		queryFn: getCoupons,
		retry: false,
	});


	return <CouponBoard isPending={isPending} coupons={data} />
};

const CouponCatalogueBoard = ({ type }) => {
	switch (type) {
		case CouponCatalougeType["All"]:
			return <AllCouponBoard />
		case CouponCatalougeType["ShopManage"]:
			return <ShopManageCouponBoard />
		case CouponCatalougeType["ShopList"]:
			return <ShopListCouponBoard />
		case CouponCatalougeType["User"]:
			return <UserCouponBoard />
	}
}

const CouponCatalogue = ({ type }) => {
  const [isFilterBoardVisible, setIsFilterBoardVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  const [searchParams] = useSearchParams();

  const [setStartDate, setEndDate, setSelectedCategories, setSearchTerm] = useCouponFiltersStore((state) => [
    state.setStartDate,
    state.setEndDate,
    state.setSelectedCategories,
    state.setSearchTerm,
  ]);

  const updateFiltersFromParamsCallback = useCallback(updateFiltersFromParams, [searchParams]);

  useEffect(() => {
    updateFiltersFromParamsCallback(searchParams, setStartDate, setEndDate, setSelectedCategories);
  }, [searchParams])


  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleSearchChange = useCallback((e) => setSearchTerm(e.target.value), []);

  const toggleFilterBoard = () => {
    setIsFilterBoardVisible(!isFilterBoardVisible);
    document.body.style.overflow = isFilterBoardVisible ? "auto" : "hidden";
  };


	return (
		<>
			<div className="flex items-center justify-between mb-4 mt-5">
				<div>
					<button
						onClick={toggleFilterBoard}
						className="bg-yellow-500 text-gray-800 px-4 py-2 rounded-md shadow-lg hover:bg-yellow-600 focus:outline-none flex items-center"
					>
						Filter
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
				className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 transform ${isFilterBoardVisible ? "translate-x-0" : "-translate-x-full"
					}`}
				style={{ width: "70%", maxWidth: "300px" }}
			>
				{isFilterBoardVisible && (
					<FilterBoard
						closeFilterBoard={toggleFilterBoard}
					/>
				)}

			</div>
			<CouponCatalogueBoard type={type} />
		</>
	)
}

export {
	AllCouponBoard,
	ShopManageCouponBoard,
	ShopListCouponBoard,
	UserCouponBoard,
};

export default CouponCatalogue;