import { create } from "zustand";

const BASE_URL_PROFILE = import.meta.env.VITE_BASE_URL_PROFILE;

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

export const useProfileStore = create((set) => ({
  profile: [],
  loading: false,
  submitting: false,
  error: null,

  getProfile: async () => {
    set({ loading: true, error: null });
    try {
      let url = `${BASE_URL_PROFILE}/profile`;

      const res = await fetch(url, {
        headers: getHeaders(true),
        cache: "no-store",
      });
      const result = await res.json();

      if (res.ok) {
        set({
          profile: result.user || [],
        });
      } else {
        set({ error: result.message || "Yuklashda xatolik" });
      }
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteAvatar: async (id) => {
    try {
      const res = await fetch(`${BASE_URL_PROFILE}/profile/avatar`, {
        method: "DELETE",
        headers: getHeaders(false),
      });

      if (res.ok) {
        set((state) => ({
          announcements: state.announcements.filter((item) => item.id !== id),
        }));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },
}));
