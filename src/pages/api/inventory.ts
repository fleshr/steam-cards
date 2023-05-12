import inventoryResponse from "@/mock/inventory";
import { IInventoryResponse } from "@/types";
import { ISteamInventoryResponse } from "@/types/steamapi";
import axios, { AxiosRequestConfig } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const inventory = async (
  req: NextApiRequest,
  res: NextApiResponse<IInventoryResponse>
) => {
  const { steamid } = req.query;

  if (!steamid)
    res.status(400).json({ success: false, message: "steamid is requried" });

  const options: AxiosRequestConfig = {
    url: `https://steamcommunity.com/inventory/${steamid}/753/6`,
    params: {
      l: "english",
      count: 2000,
    },
  };

  try {
    // const response = await axios<ISteamInventoryResponse>(options);
    // res.status(200).json({ success: true, data: response.data });

    res.status(200).json({
      success: true,
      data: inventoryResponse as ISteamInventoryResponse,
    });
  } catch (error: any) {
    res.status(error.response?.status ?? 500).json({
      success: false,
      message: error.response?.statusText ?? "Internal Server Error",
    });
  }
};

export default inventory;
