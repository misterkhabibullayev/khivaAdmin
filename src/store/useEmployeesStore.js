import { create } from "zustand";
import { fetchAPI } from "../services/api";

export const useEmployeesStore = create((set) => ({
  employees: [],
  loading: false,
  error: null,

  getEmployees: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchAPI("/employee");
      set({ employees: data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
