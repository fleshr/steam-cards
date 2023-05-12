import usePriceFetchStore from "@/zustand/pricesFetch";
import FetchError from "./FetchError";
import FetchPromt from "./FetchPromt";
import FetchStatus from "./FetchStatus/FetchStatus";

const FetchCards = () => {
  const priceFetchingStatus = usePriceFetchStore((state) => state.status);

  return (
    <div className="mt-[30px] -mb-2.5 flex w-full flex-col items-center">
      {priceFetchingStatus === "ready" && <FetchPromt />}
      {priceFetchingStatus === "error" && <FetchError />}
      {priceFetchingStatus === "fetching" && <FetchStatus />}
    </div>
  );
};

export default FetchCards;
