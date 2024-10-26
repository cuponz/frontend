import { create } from "zustand";
import { userLogout } from "../api/user";

/**
 * Custom hook to manage user state using Zustand.
 *
 * @typedef {Object} UserStore
 * @property {Object|null} user - The current user object or null if not set.
 * @property {Function} setUser - Function to update the user state with new data.
 * @property {Function} deleteUserCache - Function to clear the user state.
 * @property {Function} logout - Async function to log out the user and clear the user state.
 *
 * @returns {UserStore} The user store object.
 */
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
