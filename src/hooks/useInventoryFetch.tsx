import { IInvenory, IInventoryResponse } from "@/types";
import { minifyInventoryResponse } from "@/utils";
import axios from "axios";
import { useEffect, useState } from "react";

interface IReturn {
  data: IInvenory[] | null;
  loading: boolean;
  error: string | null;
}

const useInventoryFetch = (steamId: string): IReturn => {
  const [data, setData] = useState<IInvenory[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!steamId) return;

    const fetch = async () => {
      setLoading(true);
      setData(null);

      const options = {
        url: "/api/inventory",
        params: { steamid: steamId },
      };

      try {
        const response = await axios<IInventoryResponse>(options);
        setData(minifyInventoryResponse(response.data));
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [steamId]);

  return {
    data,
    loading,
    error,
  };
};

export default useInventoryFetch;
