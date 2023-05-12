import { ISteamInventoryResponse } from "./steamapi";

export interface IInvenory {
  classid: string;
  name: string;
  type: string;
  market_hash_name: string;
  amount: number;
  icon_url: string;
  price: number | null;
}

export interface IResponse {
  success: boolean;
  message?: string;
}

export interface IInventoryResponse extends IResponse {
  data?: ISteamInventoryResponse;
}

export interface IMarketpriceResponse extends IResponse {
  data?: { price: number };
}
