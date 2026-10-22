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

export const useGalleryStore = create((set, get) => ({
  gallery: [],
  totalPages: 1,
  loading: false,
  submitting: false,
  uploading: false,
  error: null,

  getGallery: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      let url = `${BASE_URL}/gallery?page=${page}`;

      const res = await fetch(url, {
        headers: getHeaders(false),
        cache: "no-store",
      });
      const result = await res.json();

      if (res.ok) {
        set({
          gallery: result.data || [],
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

  createGallery: async (payload) => {
    set({ submitting: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/gallery`, {
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

  deleteGallery: async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/gallery/${id}`, {
        method: "DELETE",
        headers: getHeaders(false),
      });

      if (res.ok) {
        set((state) => ({
          gallery: state.gallery.filter((item) => item.id !== id),
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
