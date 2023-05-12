import { create } from "zustand";

type IFetchingStatus = "init" | "ready" | "fetching" | "complete" | "error";

interface IStore {
  status: IFetchingStatus;
  error: "fetch" | "upload" | null;
  setError: (error: "fetch" | "upload" | null) => void;
  setStatus: (status: IFetchingStatus) => void;
}

const useInventoryFetchStore = create<IStore>()((set) => ({
  status: "init",
  error: null,
  setError: (error) => set({ error }),
  setStatus: (status) => set({ status }),
}));

export default useInventoryFetchStore;
