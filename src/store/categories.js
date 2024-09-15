import { create } from 'zustand';

export const useCategoryStore = create((set) => ({
  categories: null,
  setCategories: (categories) => set({ categories: categories }),
}));