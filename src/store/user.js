import { create } from "zustand";
import { userLogout } from "../api/user";

export const useUserStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  logout: async () => {
    try {
      await userLogout();
    } catch (err) {
      console.log(err);
    }

    set({ user: null });
  },
}));
