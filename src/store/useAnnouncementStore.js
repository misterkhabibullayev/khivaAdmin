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

export const useAnnouncementStore = create((set, get) => ({
  announcements: [],
  loading: false,
  submitting: false,
  uploading: false,
  error: null,

  getAnnouncements: async () => {
    set({ loading: true, error: null });
    try {
      let url = `${BASE_URL}/announcement`;

      const res = await fetch(url, {
        headers: getHeaders(false),
        cache: "no-store",
      });
      const result = await res.json();

      if (res.ok) {
        set({
          announcements: result.data || [],
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

  getAnnouncementById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/announcement/${id}`, {
        headers: getHeaders(false),
        cache: "no-store",
      });
      const result = await res.json();
      return res.ok ? result.announcement || result.data || result : null;
    } catch (err) {
      set({ error: err.message });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  createAnnouncement: async (payload) => {
    set({ submitting: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/announcement`, {
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

  updateAnnouncement: async (id, payload) => {
    set({ submitting: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/announcement/${id}`, {
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

  deleteAnnouncement: async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/announcement/${id}`, {
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