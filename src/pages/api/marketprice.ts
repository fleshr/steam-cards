import { IMarketpriceResponse } from "@/types";
import { ISteamPriceoverviewResponse } from "@/types/steamapi";
import axios, { AxiosRequestConfig } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const marketprice = async (
  req: NextApiRequest,
  res: NextApiResponse<IMarketpriceResponse>
) => {
  const { market_hash_name } = req.query;

  if (!market_hash_name)
    res
      .status(400)
      .json({ success: false, message: "market_hash_name is requried" });

  const options: AxiosRequestConfig = {
    url: "https://steamcommunity.com/market/priceoverview",
    params: { country: "RU", currency: 5, appid: 753, market_hash_name },
  };

  try {
    // const response = await axios<ISteamPriceoverviewResponse>(options);
    // const price = +response.data.lowest_price
    //   .split(" ")[0]
    //   .replaceAll(",", ".");

    // res.status(200).json({
    //   success: true,
    //   data: { price },
    // });

    res.status(200).json({
      success: true,
      data: {
        price: +`${Math.round(Math.random() * 5 * 100) / 100} руб`.split(
          " руб"
        )[0],
      },
    });
  } catch (error: any) {
    res.status(error.response?.status ?? 500).json({
      success: false,
      message: error.response?.statusText ?? "Internal Server Error",
    });
  }
};

export default marketprice;
