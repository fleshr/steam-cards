const FetchError = () => {
  return (
    <div className="w-full max-w-[420px] rounded-md border border-red-900/60 bg-red-900/40 px-2 py-1 text-center text-red-100">
      Error while fetching card price. <br />
      Please save inventory and try again later.
    </div>
  );
};

export default FetchError;
