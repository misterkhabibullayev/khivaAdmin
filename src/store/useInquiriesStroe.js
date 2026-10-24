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

export const useInquiriesStore = create((set) => ({
  inquiries: [],
  totalPages: 1,
  loading: false,
  submitting: false,
  error: null,

  getInquiries: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      let url = `${BASE_URL}/contact?page=${page}`;

      const res = await fetch(url, {
        headers: getHeaders(true),
        cache: "no-store",
      });
      const result = await res.json();

      if (res.ok) {
        set({
          inquiries: result.data || [],
          totalPages: result.meta?.lastPage || 1,
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

  deleteInquiries: async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/contact/${id}`, {
        method: "DELETE",
        headers: getHeaders(false),
      });

      if (res.ok) {
        set((state) => ({
          inquiries: state.inquiries.filter((item) => item.id !== id),
        }));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },
}));
