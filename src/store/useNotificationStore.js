import { create } from "zustand";

export const useNotificationStore = create((set) => ({
  notification: null,

  showNotification: (type, text) => {
    set({ notification: { type, text } });
  },

  closeNotification: () => {
    set({ notification: null });
  },
}));
