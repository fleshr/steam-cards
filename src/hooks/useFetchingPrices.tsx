import { IInvenory } from "@/types";
import { useEffect } from "react";

const useFetchingPrices = (inventory: IInvenory[]) => {
  const fetchCardsPrice = async () => {
    while (true) {
      console.log(inventory);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  };

  useEffect(() => {
    fetchCardsPrice();
  }, []);

  return [];
};

export default useFetchingPrices;
