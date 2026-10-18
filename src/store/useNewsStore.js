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

export const useNewsStore = create((set, get) => ({
  news: [],
  loading: false,
  submitting: false,
  uploading: false,
  error: null,

  getNews: async () => {
    set({ loading: true, error: null });
    try {
      let url = `${BASE_URL}/news`;

      const res = await fetch(url, {
        headers: getHeaders(false),
        cache: "no-store",
      });
      const result = await res.json();

      if (res.ok) {
        set({
          news: result.data || [],
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

  getNewsById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/news/${id}`, {
        headers: getHeaders(false),
        cache: "no-store",
      });
      const result = await res.json();
      return res.ok ? result.news || result.data || result : null;
    } catch (err) {
      set({ error: err.message });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  createNews: async (payload) => {
    set({ submitting: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/news`, {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return { ok: res.ok, data };
    } catch (err) {
      return { ok: false, error: err.message };
    } finally {
      set({ submitting: false });
    }
  },

  updateNews: async (id, payload) => {
    set({ submitting: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/news/${id}`, {
        method: "PATCH",
        headers: getHeaders(true),
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return { ok: res.ok, data };
    } catch (err) {
      return { ok: false, error: err.message };
    } finally {
      set({ submitting: false });
    }
  },

  deleteNews: async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/news/${id}`, {
        method: "DELETE",
        headers: getHeaders(false),
      });

      if (res.ok) {
        set((state) => ({
          news: state.news.filter((item) => item.id !== id),
        }));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  uploadImages: async (files) => {
    set({ uploading: true });
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        headers: getHeaders(false),
        body: formData,
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data.files)) {
        const urls = data.files.map((f) => f.url);
        return { ok: true, urls };
      }
      return { ok: false, message: data.message || "Rasm yuklanmadi" };
    } catch {
      return { ok: false, message: "Server bilan xatolik" };
    } finally {
      set({ uploading: false });
    }
  },
}));
