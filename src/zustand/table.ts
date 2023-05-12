import { create } from "zustand";

interface IStore {
  rowsDisplayed: number;
  rowsPerPage: number;
  showAll: () => void;
  showMore: () => void;
  showCertain: (count: number) => void;
  setRowsPerPage: (count: number) => void;
}

const useTableStore = create<IStore>()((set) => ({
  rowsDisplayed: 50,
  rowsPerPage: 50,
  setRowsPerPage: (count) => {
    set({ rowsPerPage: count, rowsDisplayed: count });
  },
  showAll: () => {
    set({ rowsDisplayed: 9999 });
  },
  showMore: () => {
    set((prev) => ({ rowsDisplayed: prev.rowsDisplayed + prev.rowsPerPage }));
  },
  showCertain: (count) => {
    set({ rowsDisplayed: count });
  },
}));

export default useTableStore;
