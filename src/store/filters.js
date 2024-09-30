import { create } from 'zustand';

export const useCouponFiltersStore = create((set) => ({
  appliedFilters: {
    selectedCategories: [],
    startDate: "",
    endDate: "",
    searchTerm: "",
  },
  setAppliedFilters: (newFilters) => set((state) => ({
    appliedFilters: { ...state.appliedFilters, ...newFilters }
  })),
  setStartDate: (newStartDate) => set((state) => ({
    appliedFilters: { ...state.appliedFilters, startDate: newStartDate }
  })),
  setEndDate: (newEndDate) => set((state) => ({
    appliedFilters: { ...state.appliedFilters, startDate: newEndDate }
  })),
  setSelectedCategories: (newCategories) => set((state) => ({
    appliedFilters: { ...state.appliedFilters, selectedCategories: newCategories }
  })),
  setSearchTerm: (newSearchTerm) => set((state) => ({
    appliedFilters: { ...state.appliedFilters, searchTerm: newSearchTerm }
  })),
}));