import { create } from 'zustand';

export const useCategoryStore = create((set) => ({
  categories: null,
  setCategories: (categories) => set({ categories: categories }),
}));

export const useIsCategoriesOpenStore = create((set) => ({
	isCategoriesOpen: false,
	toggleCategoriesOpen: () => set((state) => ({ isCategoriesOpen: !state.isCategoriesOpen })),
	setIsCategoriesOpen: (newIsCategoriesOpen) => set({ isCategoriesOpen: newIsCategoriesOpen }),
}));