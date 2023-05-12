interface IProps {
  error: "fetch" | "upload" | null;
}

const Error: React.FC<IProps> = ({ error }) => {
  return (
    <div className="mt-2.5 -mb-2.5 w-full rounded-md border border-red-900/60 bg-red-900/40 px-2 py-1 text-center text-red-100">
      {error === "fetch" &&
        "Can't fetch user inventory. Please try again later."}
      {error === "upload" &&
        "File don't contain required data. Please try another file."}
    </div>
  );
};

export default Error;
