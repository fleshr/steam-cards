const TableHeader = () => {
  return (
    <thead>
      <tr className="h-9 border-b border-gray-700">
        <th className="w-[50px] p-0 text-[0px] font-semibold">Image</th>
        <th className="w-[36.7023%] p-0 text-left font-semibold">Item name</th>
        <th className="w-[32.4469%] p-0 text-left font-semibold">Type</th>
        <th className="w-[12.7660%] p-0 font-semibold">Count</th>
        <th className="w-[12.7660%] p-0 font-semibold">Price</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
