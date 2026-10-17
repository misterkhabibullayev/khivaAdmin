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

export const useEmployeesStore = create((set, get) => ({
  employees: [],
  loading: false,
  submitting: false,
  uploading: false,
  error: null,

  getEmployees: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/employee`, {
        headers: getHeaders(false),
        cache: "no-store",
      });
      const data = await res.json();
      set({ employees: Array.isArray(data) ? data : data.data || [] });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  getEmployeeById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/employee/${id}`, {
        headers: getHeaders(false),
        cache: "no-store",
      });
      const data = await res.json();
      return res.ok ? data.employee || data : null;
    } catch (err) {
      set({ error: err.message });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  createEmployee: async (payload) => {
    set({ submitting: true });
    try {
      const res = await fetch(`${BASE_URL}/employee`, {
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

  updateEmployee: async (id, payload) => {
    set({ submitting: true });
    try {
      const res = await fetch(`${BASE_URL}/employee/${id}`, {
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

  deleteEmployee: async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/employee/${id}`, {
        method: "DELETE",
        headers: getHeaders(false),
      });
      if (res.ok) {
        set((state) => ({
          employees: state.employees.filter((emp) => emp.id !== id),
        }));
      }
      return res.ok;
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
