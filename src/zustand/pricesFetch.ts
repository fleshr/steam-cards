import { create } from "zustand";

type IFetchingStatus = "init" | "ready" | "fetching" | "complete" | "error";

interface IStore {
  status: IFetchingStatus;
  setStatus: (status: IFetchingStatus) => void;
}

const usePriceFetchStore = create<IStore>()((set) => ({
  status: "init",
  setStatus: (status) => set({ status }),
}));

export default usePriceFetchStore;
