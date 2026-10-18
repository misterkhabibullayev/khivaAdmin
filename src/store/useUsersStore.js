import { create } from "zustand";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getHeaders = (isJson = true) => {
  const token = localStorage.getItem("admin_token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  if (isJson) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
};

export const useUsersStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  getUsers: async () => {
    set({ loading: true, error: null });
    try {
      let url = `${BASE_URL}/user`;

      const res = await fetch(url, {
        headers: getHeaders(false),
        cache: "no-store",
      });
      const result = await res.json();

      if (res.ok) {
        set({
          users: result.users.data || result.users || result || [],
        });
      } else {
        set({
          error: result.message || "Foydalanuvchilarni yuklashda xatolik",
        });
      }
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));
