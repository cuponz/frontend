import { useMemo } from "react";
import Fuse from "fuse.js";
import { CouponCatalogueType } from "@/constants";

import CouponCard from "./CouponCard";

import { useCouponFiltersStore } from "../../../store/filters";
import PaginationContainer from "../../Wrapper/PaginationContainer";

/**
 * @typedef {Object} CouponFilters
 * @property {string[]} selectedCategories - List of selected category filters
 * @property {string} startDate - Start date filter in ISO format
 * @property {string} endDate - End date filter in ISO format
 * @property {string} searchTerm - Search text filter
 */

/**
 * @typedef {Object} Coupon
 * @property {string} title - Coupon title
 * @property {string} desc - Coupon description
 * @property {string[]} keywords - Search keywords
 * @property {string} shop_name - Name of the shop
 * @property {string} shop - Shop identifier
 * @property {string} category - Coupon category
 * @property {string} start_date - Start date in ISO format
 * @property {string} end_date - End date in ISO format
 * @property {string} [code] - Optional coupon code
 */

/**
 * CouponBoard component displays a filterable, searchable grid of coupon cards with pagination.
 *
 * @param {Object} props - The component props
 * @param {boolean} props.isPending - Loading state indicator
 * @param {Coupon[]} [props.coupons=[]] - Array of coupon objects to display
 * @param {('shoplist'|'all'|'user')} props.type - Type of coupon catalogue view
 * @param {Function} props.setShowUserTable - Callback to toggle user table visibility
 * @param {Function} props.setSelectedCouponId - Callback to set selected coupon ID
 * @returns {JSX.Element} Rendered coupon grid with pagination
 */
const CouponBoard = ({
	isPending,
	coupons = [],
	type,
	setShowUserTable,
	setSelectedCouponId,
}) => {
	const appliedFilters = useCouponFiltersStore((state) => state.appliedFilters);

	/**
	 * Initialize Fuse.js search instance for coupon filtering
	 * @type {require('fuse.js')<Coupon>}
	 */
	const fuse = useMemo(
		() =>
			new Fuse(coupons, {
				keys: ["title", "desc", "keywords", "shop_name", "shop"],
				threshold: 0.4,
			}),
		[coupons],
	);

	/**
	 * Filter and search coupons based on applied filters. Uses Fuse.js for fuzzy search
	 * and applies category and date range filters.
	 *
	 * @param {Coupon[]} coupons - Array of coupons to filter
	 * @param {CouponFilters} appliedFilters - Current filter settings
	 * @param {Fuse<Coupon>} fuse - Initialized Fuse.js instance
	 * @returns {Coupon[]} Filtered array of coupons
	 */
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

	/**
	 * Handle showing stats for a specific coupon
	 * @param {string} couponId - ID of the coupon to show stats for
	 */
	const handleShowStats = (couponId) => {
		setSelectedCouponId(couponId);
		setShowUserTable(true);
	};

	/**
	 * Handles showing statistics for a selected coupon by updating parent state
	 *
	 * @param {string} couponId - Unique identifier of the coupon to show stats for
	 * @returns {void}
	 */

	/**
	 * Renders the paginated grid of coupon cards with applied filters
	 *
	 * @param {Coupon[]} currentCoupons - Current page of filtered coupons
	 * @returns {JSX.Element[]} Array of rendered CouponCard components
	 */
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
