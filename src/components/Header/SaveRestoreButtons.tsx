import { IInvenory } from "@/types";
import useInventoryStore from "@/zustand/inventory";
import useInventoryFetchStore from "@/zustand/inventoryFetch";
import usePriceFetchStore from "@/zustand/pricesFetch";
import saveAs from "file-saver";
import { useRef } from "react";
import { INVENTORY_ITEM_KEYS } from "../constants/inventoryItem";

const SaveRestoreButtons = () => {
  const inventory = useInventoryStore((state) => state.inventory);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const setInventory = useInventoryStore((state) => state.setInventory);
  const setPriceFetchingStatus = usePriceFetchStore((state) => state.setStatus);
  const setInventoryFetchingStatus = useInventoryFetchStore(
    (state) => state.setStatus
  );
  const setInventoryFetchingError = useInventoryFetchStore(
    (state) => state.setError
  );

  const handleDownloadClick = () => {
    const inventoryBlob = new Blob([JSON.stringify(inventory)], {
      type: "application/json",
    });
    saveAs(inventoryBlob, "inventory.json");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInventoryFetchingStatus("init");
    setPriceFetchingStatus("init");
    setInventoryFetchingError(null);

    if (
      !e.target.files?.length ||
      e.target.files[0].type !== "application/json"
    )
      return;

    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      if (!event.target?.result) return;

      try {
        const inventory = JSON.parse(
          event.target?.result as string
        ) as IInvenory[];

        if (
          !Array.isArray(inventory) ||
          !inventory.every((item) =>
            Object.keys(item).every((key) => INVENTORY_ITEM_KEYS.includes(key))
          )
        ) {
          throw new Error();
        }

        setInventory(inventory);

        const fullyFetchedPrices =
          inventory.findIndex((item) => !item.price) === -1;

        if (fullyFetchedPrices) {
          setPriceFetchingStatus("complete");
        } else {
          setPriceFetchingStatus("ready");
        }
      } catch (error: any) {
        setInventoryFetchingError("upload");
        console.log(error);
      }
    });
    reader.readAsText(e.target.files[0]);
  };

  return (
    <div className="mt-5 flex items-center font-semibold">
      <input
        onClick={(e) => {
          const element = e.target as HTMLInputElement;
          element.value = "";
        }}
        onChange={handleFileChange}
        ref={inputFileRef}
        type="file"
        name="file-selector"
        id="file-selector"
        className="hidden"
        accept="application/json"
      />
      <button
        onClick={() => inputFileRef.current?.click()}
        className="h-8 w-[95px] rounded-md bg-sky-700 hover:bg-sky-600/80"
      >
        Upload
      </button>
      <span className="mx-3 sm:mx-4">OR</span>
      <button
        onClick={handleDownloadClick}
        className="h-8 w-[95px] rounded-md bg-sky-700 hover:bg-sky-600/80 disabled:bg-sky-900 disabled:text-gray-300"
        disabled={!inventory.length}
      >
        Download
      </button>
    </div>
  );
};

export default SaveRestoreButtons;
