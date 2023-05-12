import useInventoryStore from "@/zustand/inventory";
import useInventoryFetchStore from "@/zustand/inventoryFetch";
import usePriceFetchStore from "@/zustand/pricesFetch";
import Error from "./Error";
import FetchCards from "./FetchCards/FetchCards";
import SaveRestoreButtons from "./SaveRestoreButtons";
import UserInventoryFetch from "./UserInventoryFetch";

const Header = () => {
  const inventory = useInventoryStore((state) => state.inventory);
  const priceFetchingStatus = usePriceFetchStore((state) => state.status);
  const inventoryFetchingError = useInventoryFetchStore((state) => state.error);

  return (
    <header className="mx-auto flex w-full max-w-[36.25rem] flex-col items-center px-2.5">
      <h1 className="text-center text-lg font-semibold">
        Steam inventory cards price
      </h1>
      <p className="mt-0.5 text-center">
        Load your cards and sort by market price
      </p>
      <UserInventoryFetch />
      {inventoryFetchingError && <Error error={inventoryFetchingError} />}
      <SaveRestoreButtons />
      {!!inventory.length &&
        priceFetchingStatus !== "complete" &&
        priceFetchingStatus !== "init" && <FetchCards />}
    </header>
  );
};

export default Header;
