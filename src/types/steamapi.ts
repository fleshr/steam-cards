export interface ISteamPriceoverviewResponse {
  success: boolean;
  lowest_price: string;
  volume: string;
  median_price: string;
}

export interface ISteamInventoryResponse {
  assets: IAsset[];
  descriptions: IDescription[];
  more_items?: number;
  last_assetid?: string;
  total_inventory_count: number;
  success: number;
  rwgrsn: number;
}

export interface IAsset {
  appid: number;
  contextid: string;
  assetid: string;
  classid: string;
  instanceid: string;
  amount: string;
}

export interface IDescription {
  appid: number;
  classid: string;
  instanceid: string;
  currency: number;
  background_color: string;
  icon_url: string;
  icon_url_large: string;
  descriptions: DescriptionDescription[];
  tradable: number;
  owner_actions: OwnerAction[];
  name: string;
  type: string;
  market_name: string;
  market_hash_name: string;
  market_fee_app: number;
  commodity: number;
  market_tradable_restriction: number;
  market_marketable_restriction: number;
  marketable: number;
  tags: Tag[];
}

export interface DescriptionDescription {
  value: string;
}

export interface OwnerAction {
  link: string;
  name: string;
}

export interface Tag {
  category: string;
  internal_name: string;
  localized_category_name: string;
  localized_tag_name: string;
}
