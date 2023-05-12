import { IInvenory } from "@/types";
import Image from "next/image";

interface IProps {
  item: IInvenory;
}

const TableRow: React.FC<IProps> = ({ item }) => {
  return (
    <tr className="h-9 border-b border-gray-700 hover:bg-gray-700">
      <td className="w-[50px] p-0">
        <Image
          src={`https://community.akamai.steamstatic.com/economy/image/${item.icon_url}`}
          alt={`${item.name} image`}
          width={30}
          height={35}
          className="h-[35px] w-auto"
        />
      </td>
      <td className="w-[36.7023%] truncate p-0 font-medium">{item.name}</td>
      <td className="w-[32.4469%] truncate p-0">{item.type}</td>
      <td className="w-[12.7660%] p-0 text-center">{item.amount}</td>
      <td
        className={`w-[12.7660%] p-0 text-center ${
          item.price ?? "text-gray-500"
        }`}
      >
        {item.price ? `${item.price} руб` : "NF"}
      </td>
    </tr>
  );
};

export default TableRow;
