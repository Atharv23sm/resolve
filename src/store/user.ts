import { baseUrl } from "@/utils/baseUrl";
import axios from "axios";
import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: {
    username: "",
    email: "",
  },
  getUser: async () => {
    const res = await axios.get(`${baseUrl}users/getdata`);
    const user = res.data.user;
    set({ user });
  },
  clearUser: () => set({ user: { username: "", email: "" } }),
}));
