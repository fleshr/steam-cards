import { IInvenory } from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IStore {
  cardsAmount: number;
  inventory: IInvenory[];
  setInventory: (inventory: IInvenory[]) => void;
  updatePrice: (classid: string, price: number) => void;
}

const useInventoryStore = create<IStore>()(
  immer((set) => ({
    inventory: [],
    cardsAmount: 0,
    setInventory: (inventory) => {
      set({
        inventory,
        cardsAmount: inventory.reduce((acc, el) => acc + el.amount, 0),
      });
    },
    updatePrice: (classid, price) => {
      set((state) => {
        const index = state.inventory.findIndex(
          (item) => item.classid === classid
        );
        if (index !== -1) state.inventory[index].price = price;
      });
    },
  }))
);

export default useInventoryStore;
