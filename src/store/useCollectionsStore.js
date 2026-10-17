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

export const useCollectionsStore = create((set, get) => ({
  collections: [],
  meta: {
    page: 1,
    limit: 10,
    total: 0,
    lastPage: 1,
  },
  loading: false,
  submitting: false,
  uploading: false,
  error: null,

  getCollections: async (page = 1, limit = 10, search = "") => {
    set({ loading: true, error: null });
    try {
      let url = `${BASE_URL}/collection?page=${page}&limit=${limit}`;
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }

      const res = await fetch(url, {
        headers: getHeaders(false),
        cache: "no-store",
      });
      const result = await res.json();

      if (res.ok) {
        set({
          collections: result.data || [],
          meta: result.meta || { page, limit, total: 0, lastPage: 1 },
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

  getCollectionById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/collection/${id}`, {
        headers: getHeaders(false),
        cache: "no-store",
      });
      const result = await res.json();
      return res.ok ? result.collection || result.data || result : null;
    } catch (err) {
      set({ error: err.message });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  deleteCollection: async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/collection/${id}`, {
        method: "DELETE",
        headers: getHeaders(false),
      });

      if (res.ok) {
        set((state) => ({
          collections: state.collections.filter((item) => item.id !== id),
          meta: {
            ...state.meta,
            total: Math.max(0, state.meta.total - 1),
          },
        }));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  uploadImage: async (file) => {
    set({ uploading: true });
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        headers: getHeaders(false),
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.files?.[0]?.url) {
        return { ok: true, url: data.files[0].url };
      }
      return { ok: false, message: data.message || "Rasm yuklanmadi" };
    } catch {
      return { ok: false, message: "Server bilan xatolik" };
    } finally {
      set({ uploading: false });
    }
  },
}));
