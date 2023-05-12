import { IInvenory, IMarketpriceResponse } from "@/types";
import { toReadableTime } from "@/utils";
import useInventoryStore from "@/zustand/inventory";
import usePriceFetchStore from "@/zustand/pricesFetch";
import axios from "axios";
import { useEffect, useRef } from "react";
import ProgressBar from "./ProgressBar";

const FetchStatus = () => {
  const inventory = useInventoryStore((state) => state.inventory);
  const inventoryRef = useRef<IInvenory[]>(inventory);
  const updatePrice = useInventoryStore((state) => state.updatePrice);
  const setPriceFetchingStatus = usePriceFetchStore((state) => state.setStatus);

  const fetchedCount = inventory.reduce((acc, el) => {
    if (el.price) acc++;
    return acc;
  }, 0);
  const totalCount = inventory.length;
  const timeLeft = toReadableTime((totalCount - fetchedCount) * 3);

  useEffect(() => {
    inventoryRef.current = inventory;
  }, [inventory]);

  let stopLoop = false;
  const fetchCardsPrice = async () => {
    let notFetchedCard = inventoryRef.current.find((item) => !item.price);
    while (notFetchedCard && !stopLoop) {
      const options = {
        url: "/api/marketprice",
        params: {
          market_hash_name: notFetchedCard.market_hash_name,
        },
      };
      try {
        const response = await axios<IMarketpriceResponse>(options);
        updatePrice(notFetchedCard.classid, response.data.data?.price!);
        notFetchedCard = inventoryRef.current.find(
          (item) => !item.price && item.classid !== notFetchedCard?.classid
        );
        if (notFetchedCard) {
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      } catch (error) {
        console.log(error);
        stopLoop = true;
      }
    }
    setPriceFetchingStatus(!stopLoop ? "complete" : "error");
  };

  useEffect(() => {
    fetchCardsPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3 className="text-base font-semibold">Fetching items prices</h3>
      <p className="mt-2.5 flex w-full flex-wrap items-center justify-center gap-x-[20px] gap-y-1 text-gray-300 sm:gap-x-[30px]">
        <span className="whitespace-nowrap text-right">
          Fetched: {fetchedCount} of {totalCount}
        </span>
        <span className="whitespace-nowrap text-left">
          Time left: {timeLeft}
        </span>
      </p>
      <ProgressBar progress={(fetchedCount / totalCount) * 100} />
    </>
  );
};

export default FetchStatus;
