import useInventoryStore from "@/zustand/inventory";
import useTableStore from "@/zustand/table";
import FooterButtons from "./FooterButtons";
import HeaderControls from "./HeaderControls";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const InventoryTable = () => {
  const inventory = useInventoryStore((state) => state.inventory);
  const rowsDisplayed = useTableStore((state) => state.rowsDisplayed);

  const tableRows = [...inventory]
    .sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    .slice(0, rowsDisplayed)
    .map((item) => <TableRow key={item.classid} item={item} />);

  return (
    <>
      <HeaderControls />
      <div className="mt-2.5 overflow-y-auto pb-2.5 sm:px-2.5">
        <table className="mx-2.5 w-[calc(100%_-_20px)] min-w-[40rem] table-fixed sm:m-0 sm:w-full sm:min-w-[35rem]">
          <TableHeader />
          <tbody>{tableRows}</tbody>
        </table>
      </div>
      {rowsDisplayed < inventory.length && <FooterButtons />}
    </>
  );
};

export default InventoryTable;
