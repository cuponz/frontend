import { useMemo } from "react";
import Fuse from "fuse.js";
import { CouponCatalogueType } from "@/constants";

import CouponCard from "./CouponCard";

import { useCouponFiltersStore } from "../../../store/filters";
import PaginationContainer from "../../Wrapper/PaginationContainer";

const CouponBoard = ({
	isPending,
	coupons = [],
	type,
	setShowUserTable,
	setSelectedCouponId,
}) => {
	const appliedFilters = useCouponFiltersStore((state) => state.appliedFilters);

	const fuse = useMemo(
		() =>
			new Fuse(coupons, {
				keys: ["title", "desc", "keywords", "shop_name", "shop"],
				threshold: 0.4,
			}),
		[coupons],
	);

	const filteredCoupons = useMemo(() => {
		let filtered = coupons;

		const { selectedCategories, startDate, endDate, searchTerm } =
			appliedFilters;

		if (searchTerm) {
			const searchResults = fuse.search(searchTerm);
			filtered = searchResults.map((result) => result.item);
		}

		filtered = filtered.filter((coupon) => {
			if (
				selectedCategories.length > 0 &&
				!selectedCategories.includes(coupon.category)
			) {
				return false;
			}
			if (startDate && coupon.start_date < startDate) {
				return false;
			}
			if (endDate && coupon.end_date > endDate) {
				return false;
			}

			return true;
		});

		return filtered;
	}, [appliedFilters, fuse, coupons]);

	const handleShowStats = (couponId) => {
		setSelectedCouponId(couponId);
		setShowUserTable(true);
	};

	return (
		<PaginationContainer
			items={filteredCoupons}
			isPending={isPending}
			renderItems={(currentCoupons) =>
				currentCoupons.map((coupon, index) => {
					if (
						type === CouponCatalogueType.ShopList ||
						type === CouponCatalogueType.All
					) {
						coupon.code = undefined;
					}
					return (
						<CouponCard
							key={index}
							coupon={coupon}
							type={type}
							onShowStats={handleShowStats}
						/>
					);
				})
			}
		/>
	);
};

export default CouponBoard;
