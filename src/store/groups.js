import { create } from "zustand";

export const useGroupStore = create((set) => ({
	groups: null,
	setGroups: (groups) => set({ groups: groups }),
}));