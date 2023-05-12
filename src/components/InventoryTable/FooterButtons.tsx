import useTableStore from "@/zustand/table";

const FooterButtons = () => {
  const showMore = useTableStore((state) => state.showMore);
  const showAll = useTableStore((state) => state.showAll);

  return (
    <div className="mt-2.5 flex justify-center gap-5">
      <button
        onClick={() => showAll()}
        className="h-8 w-[100px] rounded-md bg-sky-700 font-semibold hover:bg-sky-600/80"
      >
        Show all
      </button>
      <button
        onClick={() => showMore()}
        className="h-8 w-[100px] rounded-md bg-sky-700 font-semibold hover:bg-sky-600/80"
      >
        Show more
      </button>
    </div>
  );
};

export default FooterButtons;
