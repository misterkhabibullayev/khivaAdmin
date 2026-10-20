import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSidebarStore = create(
  persist(
    (set) => ({
      isCollapse: false,

      toggleCollapse: () => set((state) => ({ isCollapse: !state.isCollapse })),

      setIsCollapse: (value) => set({ isCollapse: value }),
    }),
    {
      name: "sidebar-storage",
    },
  ),
);
