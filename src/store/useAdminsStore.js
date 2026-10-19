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

export const useAdminsStore = create((set) => ({
  admins: [],
  loading: false,
  submitting: false,
  error: null,

  getAdmins: async () => {
    set({ loading: true, error: null });
    try {
      let url = `${BASE_URL}`;

      const res = await fetch(url, {
        headers: getHeaders(true),
        cache: "no-store",
      });
      const result = await res.json();

      if (res.ok) {
        set({
          admins: result.admins || [],
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

  getAdminById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        headers: getHeaders(true),
        cache: "no-store",
      });
      const result = await res.json();
      return res.ok ? result.admins || result.data || result : null;
    } catch (err) {
      set({ error: err.message });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  updateAdmin: async (id, payload) => {
    set({ submitting: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
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

  deleteAdmin: async (id) => {
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
}));
