import { minifyInventoryResponse } from "@/utils";
import useInventoryStore from "@/zustand/inventory";
import useInventoryFetchStore from "@/zustand/inventoryFetch";
import usePriceFetchStore from "@/zustand/pricesFetch";
import axios from "axios";
import { FormEvent, useState } from "react";
import { IInventoryResponse } from "../../types";
import Spinner from "./Spinner";

const UserInventoryFetch = () => {
  const [steamid, setSteamid] = useState("");
  const setInventory = useInventoryStore((state) => state.setInventory);
  const setPriceFetchingStatus = usePriceFetchStore((state) => state.setStatus);
  const setInventoryFetchingStatus = useInventoryFetchStore(
    (state) => state.setStatus
  );
  const setInventoryFetchingError = useInventoryFetchStore(
    (state) => state.setError
  );
  const inventoryFetchStatus = useInventoryFetchStore((state) => state.status);

  const handelFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!steamid.trim()) return;

    setPriceFetchingStatus("init");
    setInventoryFetchingStatus("fetching");
    setInventoryFetchingError(null);

    const options = {
      url: "/api/inventory",
      params: { steamid },
    };

    try {
      const response = await axios<IInventoryResponse>(options);
      setInventory(minifyInventoryResponse(response.data));

      setInventoryFetchingStatus("complete");
      setPriceFetchingStatus("fetching");
    } catch (error) {
      setInventoryFetchingStatus("error");
      setInventoryFetchingError("fetch");
      console.log(error);
    }
  };

  return (
    <form className="mt-6 flex h-8 w-full" onSubmit={handelFormSubmit}>
      <label
        className="h-full flex-shrink-0 rounded-tl-md rounded-bl-md border border-gray-600 bg-gray-600/20 px-2.5 font-semibold leading-[30px]"
        htmlFor="steamid"
      >
        SteamID
      </label>
      <input
        type="text"
        name="steamid"
        id="steamid"
        className="h-8 w-full border-t border-b border-gray-600 bg-transparent px-2.5"
        placeholder="Your profile SteamID"
        onChange={(e) => setSteamid(e.target.value)}
      />
      <button
        type="submit"
        className="flex h-full w-[65px] flex-shrink-0 items-center justify-center rounded-tr-md rounded-br-md border border-white/10 bg-sky-700 font-semibold hover:bg-sky-600/80"
      >
        {inventoryFetchStatus === "fetching" ? <Spinner /> : "Fetch"}
      </button>
    </form>
  );
};

export default UserInventoryFetch;
