import placeholder from "@/mock/placeholder";
import { TiArrowUnsorted } from "react-icons/ti";
import TableHeader from "../InventoryTable/TableHeader";
import TableRow from "../InventoryTable/TableRow";

const TablePlaceholder = () => {
  return (
    <div className="relative after:absolute after:top-0 after:left-0 after:h-full after:w-full after:bg-placeholder after:content-['']">
      <div className="flex items-center justify-between px-2.5">
        <p className="font-semibold">Cards: 136</p>
        <label className="relative font-semibold" htmlFor="shown-rows">
          Shown:
          <select
            defaultValue={50}
            className="ml-2 h-7 appearance-none rounded-md border border-gray-600 bg-gray-800 pl-2.5 pr-5 font-normal"
            name="shown-rows"
            id="shown-rows"
          >
            <option value="50">50</option>
          </select>
          <TiArrowUnsorted className="absolute top-2 right-2 text-xs" />
        </label>
      </div>
      <div className="mt-2.5 overflow-y-auto pb-2.5 sm:px-2.5">
        <table className="mx-2.5 w-[calc(100%_-_20px)] min-w-[640px] table-fixed sm:m-0 sm:w-full sm:min-w-[560px]">
          <TableHeader />
          <tbody>
            {placeholder.map((item) => (
              <TableRow key={item.classid} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePlaceholder;
