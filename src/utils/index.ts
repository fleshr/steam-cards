import { IInvenory, IInventoryResponse } from "@/types";

export const minifyInventoryResponse = (
  response: IInventoryResponse
): IInvenory[] => {
  if (!response.data) return [];

  // merge assets and descriptions
  const inventory = response.data.assets.map((asset) => {
    let description = response.data!.descriptions.find(
      (description) => description.classid === asset.classid
    );
    return { ...asset, ...description };
  });

  // check for dublicates and change amount
  const dedupedInventory = inventory.reduce((acc, invEl) => {
    const index = acc.findIndex((accEl) => invEl.classid === accEl.classid);
    if (index !== -1) {
      acc[index].amount++;
    } else {
      acc.push({ ...invEl, amount: 1 });
    }
    return acc;
  }, [] as any[]);

  // filter marketable cards and format for using in app
  return dedupedInventory
    .filter((item) => item.instanceid === "246376127" && item.marketable)
    .map((item) => ({
      classid: item.classid,
      name: item.name,
      type: item.type,
      market_hash_name: item.market_hash_name,
      amount: item.amount,
      icon_url: item.icon_url,
      price: null,
    }));
};

export const toReadableTime = (seconds: number) => {
  if (!seconds) return "0s";

  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = (seconds % 3600) % 60;

  return `${hours ? hours + "h " : ""}
  ${mins ? mins + "m " : ""}
  ${secs ? secs + "s" : ""}`;

  // if (seconds > 3600)
  //   return `${Math.floor(seconds / 3600)}h ${Math.floor(
  //     (seconds % 3600) / 60
  //   )}m`;
  // if (seconds > 60) return `${Math.floor(seconds / 60)}m`;
  // return `${seconds}s`;
};
