import { create } from "zustand";

export const useCategoryStore = create((set) => ({
	categories: null,
	setCategories: (categories) => set({ categories: categories }),
}));

/**
 * A Zustand store for managing the state of category visibility.
 *
 * @typedef {Object} CategoriesStore
 * @property {boolean} isCategoriesOpen - Indicates whether the categories are open.
 * @property {function} toggleCategoriesOpen - Toggles the state of `isCategoriesOpen`.
 * @property {function} setIsCategoriesOpen - Sets the state of `isCategoriesOpen` to a specific value.
 *
 * @returns {CategoriesStore} The Zustand store for category visibility.
 */
export const useIsCategoriesOpenStore = create((set) => ({
	isCategoriesOpen: false,
	toggleCategoriesOpen: () =>
		set((state) => ({ isCategoriesOpen: !state.isCategoriesOpen })),
	setIsCategoriesOpen: (newIsCategoriesOpen) =>
		set({ isCategoriesOpen: newIsCategoriesOpen }),
}));
