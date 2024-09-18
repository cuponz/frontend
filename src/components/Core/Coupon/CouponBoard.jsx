import { useState, useMemo } from "react";
import Fuse from "fuse.js";

import CouponCard from "./CouponCard";
import Pagination from "../../Utils/Pagination";
import LoadingSpinner from "../../Utils/LoadingSpinner"; // Import the new component

import { useCouponFiltersStore } from "../../../store/filters";

const itemsPerPage = 8;

const CouponBoard = ({ isPending, coupons = [] }) => {
	const [currentPage, setCurrentPage] = useState(1);
  const appliedFilters = useCouponFiltersStore((state) => state.appliedFilters)

	const fuse = useMemo(() => new Fuse(coupons, {
    keys: ["title", "description", "keywords", "name"],
    threshold: 0.3,
  }), [coupons]);


	const filteredCoupons = useMemo(() => {
		let filtered = coupons;

		const {
			selectedCategories,
			startDate,
			endDate,
			searchTerm,
		} = appliedFilters;

		if (searchTerm) {
			const searchResults = fuse.search(searchTerm);
			filtered = searchResults.map((result) => result.item);
		}

		filtered = filtered.filter((coupon) => {
			if (selectedCategories.length > 0 && !selectedCategories.includes(coupon.category)) {
				return false;
			}
			if (startDate && coupon.start_date < startDate) {
				return false
			}
			if (endDate && coupon.end_date > endDate) {
				return false
			}

			return true;
		});

		setCurrentPage(1);

		return filtered;
	}, [appliedFilters, fuse]);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const currentCoupons = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage;
		return filteredCoupons.slice(
			start	,
			start + itemsPerPage,
		);
	}, [currentPage, filteredCoupons]);

	if (isPending) {
		return <LoadingSpinner />
	}

	return (
		<>
			<div className="flex justify-between items-center mt-4 mb-4">
				<div className="text-lg font-medium">
					{`${filteredCoupons.length} / ${coupons.length} Coupons found`}
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
				{currentCoupons.map((coupon, index) => (
					<CouponCard
						key={index}
						logo={coupon.logo_url}
						title={coupon.title}
						keywords={coupon.keywords}
						startDate={coupon.start_date}
						endDate={coupon.end_date}
						description={coupon.desc}
						shopName={coupon.name}
						maxUsage={coupon.max_usage}
						usageCount={coupon.usage_count}
					/>
				))}
			</div>

			<div className="mt-8 mb-8">
				<Pagination
					currentPage={currentPage}
					totalPages={Math.ceil(
						filteredCoupons.length / itemsPerPage
					)}
					onPageChange={handlePageChange}
				/>
			</div>
		</>
	);
};

export default CouponBoard;