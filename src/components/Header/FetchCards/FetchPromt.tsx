import usePriceFetchStore from "@/zustand/pricesFetch";

const FetchPromt = () => {
  const setPriceFetchingStatus = usePriceFetchStore((state) => state.setStatus);

  return (
    <>
      <p>Now you can fetch cards price</p>
      <button
        onClick={() => setPriceFetchingStatus("fetching")}
        className="mt-2.5 h-8 w-[140px] rounded-md bg-sky-700 font-semibold hover:bg-sky-600/80"
      >
        Fetch cards price
      </button>
    </>
  );
};

export default FetchPromt;
