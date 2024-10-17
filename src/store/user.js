import { create } from "zustand";
import { userLogout } from "../api/user";

export const useUserStore = create((set) => ({
	user: null,
	setUser: (userData) =>
		set((state) => ({ user: { ...state.user, ...userData } })),
	deleteUserCache: () => set({ user: null }),
	logout: async () => {
		try {
			await userLogout();
		} catch (err) {
			console.log(err);
		}

		set({ user: null });
	},
}));
