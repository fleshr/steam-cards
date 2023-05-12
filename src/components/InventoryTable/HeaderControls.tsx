import useInventoryStore from "@/zustand/inventory";
import useTableStore from "@/zustand/table";
import { TiArrowUnsorted } from "react-icons/ti";

const HeaderControls = () => {
  const rowsPerPage = useTableStore((state) => state.rowsPerPage);
  const cardsAmount = useInventoryStore((state) => state.cardsAmount);
  const setRowsPerPage = useTableStore((state) => state.setRowsPerPage);

  return (
    <div className="flex items-center justify-between px-2.5">
      <p className="font-semibold">Cards: {cardsAmount}</p>
      <label className="relative font-semibold" htmlFor="shown-rows">
        Shown:
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(+e.target.value)}
          className="ml-2 h-7 appearance-none rounded-md border border-gray-600 bg-gray-800 pl-2.5 pr-5 font-normal"
          name="shown-rows"
          id="shown-rows"
        >
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="500">500</option>
        </select>
        <TiArrowUnsorted className="absolute top-2 right-2 text-xs" />
      </label>
    </div>
  );
};

export default HeaderControls;
