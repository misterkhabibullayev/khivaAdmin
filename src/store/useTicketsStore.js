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

export const useTicketsStore = create((set, get) => ({
  tickets: [],
  orders: [],
  ticketsTotalPages: 1,
  ordersTotalPages: 1,
  loading: false,
  submitting: false,
  error: null,

  getTickets: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/tickets?page=${page}`, {
        headers: getHeaders(false),
        cache: "no-store",
      });
      const result = await res.json();

      if (res.ok) {
        set({
          tickets: result.data,
          ticketsTotalPages: result.meta?.lastPage,
        });
      } else {
        set({
          error: result.message || "Chiptalarni yuklashda xatolik yuz berdi",
        });
      }
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  getTicketById: async (id) => {
    const existing = get().tickets.find(
      (t) => String(t.id || t._id) === String(id),
    );
    if (existing) return existing;

    set({ loading: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/tickets/${id}`, {
        headers: getHeaders(false),
        cache: "no-store",
      });
      const result = await res.json();

      if (res.ok) {
        return result.data || result;
      }

      const listRes = await fetch(`${BASE_URL}/tickets`, {
        headers: getHeaders(false),
        cache: "no-store",
      });
      const listResult = await listRes.json();
      const list = listResult.data || listResult || [];

      set({ tickets: list });
      return list.find((t) => String(t.id || t._id) === String(id)) || null;
    } catch (err) {
      set({ error: err.message });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  createTicket: async (payload) => {
    set({ submitting: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/tickets`, {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        const newTicket = data.data || data;
        set((state) => ({
          tickets: [newTicket, ...state.tickets],
        }));
      }

      return { ok: res.ok, data };
    } catch (err) {
      return { ok: false, error: err.message };
    } finally {
      set({ submitting: false });
    }
  },

  updateTicket: async (id, payload) => {
    set({ submitting: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/tickets/${id}`, {
        method: "PATCH",
        headers: getHeaders(true),
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        const updatedItem = data.data || data;
        set((state) => ({
          tickets: state.tickets.map((item) =>
            item.id === id ? { ...item, ...updatedItem } : item,
          ),
        }));
      }

      return { ok: res.ok, data };
    } catch (err) {
      return { ok: false, error: err.message };
    } finally {
      set({ submitting: false });
    }
  },

  deleteTicket: async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/tickets/${id}`, {
        method: "DELETE",
        headers: getHeaders(false),
      });

      if (res.ok) {
        set((state) => ({
          tickets: state.tickets.filter((item) => item.id !== id),
        }));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  getOrders: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/tickets/orders?page=${page}`, {
        headers: getHeaders(false),
        cache: "no-store",
      });
      const result = await res.json();

      if (res.ok) {
        set({
          orders:
            result.data ||
            result.orders ||
            (Array.isArray(result) ? result : []),
          ordersTotalPages: result.meta?.lastPage || result.totalPages || 1,
        });
      } else {
        set({
          error: result.message || "Buyurtmalarni yuklashda xatolik yuz berdi",
        });
      }
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  updateOrderStatus: async (id, status) => {
    set({ submitting: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/tickets/orders/${id}/status`, {
        method: "PATCH",
        headers: getHeaders(true),
        body: JSON.stringify({ status }),
      });
      const data = await res.json();

      if (res.ok) {
        set((state) => ({
          orders: state.orders.map((item) =>
            item.id === id ? { ...item, status } : item,
          ),
        }));
      }

      return { ok: res.ok, data };
    } catch (err) {
      return { ok: false, error: err.message };
    } finally {
      set({ submitting: false });
    }
  },
}));
