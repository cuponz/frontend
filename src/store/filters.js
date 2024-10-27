import { create } from "zustand";

/**
 * Custom hook to manage coupon filters state.
 *
 * @function useCouponFiltersStore
 * @param {Function} set - Function to update the state.
 * @returns {Object} - The state and setter functions for coupon filters.
 * @property {Object} appliedFilters - The currently applied filters.
 * @property {Array} appliedFilters.selectedCategories - List of selected categories.
 * @property {string} appliedFilters.startDate - The start date filter.
 * @property {string} appliedFilters.endDate - The end date filter.
 * @property {string} appliedFilters.searchTerm - The search term filter.
 * @property {Function} setAppliedFilters - Function to set multiple filters at once.
 * @property {Function} setStartDate - Function to set the start date filter.
 * @property {Function} setEndDate - Function to set the end date filter.
 * @property {Function} setSelectedCategories - Function to set the selected categories filter.
 * @property {Function} setSearchTerm - Function to set the search term filter.
 */
export const useCouponFiltersStore = create((set) => ({
	appliedFilters: {
		selectedCategories: [],
		startDate: "",
		endDate: "",
		searchTerm: "",
	},
	setAppliedFilters: (newFilters) =>
		set((state) => ({
			appliedFilters: { ...state.appliedFilters, ...newFilters },
		})),
	setStartDate: (newStartDate) =>
		set((state) => ({
			appliedFilters: { ...state.appliedFilters, startDate: newStartDate },
		})),
	setEndDate: (newEndDate) =>
		set((state) => ({
			appliedFilters: { ...state.appliedFilters, startDate: newEndDate },
		})),
	setSelectedCategories: (newCategories) =>
		set((state) => ({
			appliedFilters: {
				...state.appliedFilters,
				selectedCategories: newCategories,
			},
		})),
	setSearchTerm: (newSearchTerm) =>
		set((state) => ({
			appliedFilters: { ...state.appliedFilters, searchTerm: newSearchTerm },
		})),
}));
