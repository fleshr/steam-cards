interface IProps {
  progress: number;
}

const ProgressBar: React.FC<IProps> = ({ progress }) => {
  return (
    <div className="mt-5 h-2 w-full rounded-full border border-gray-600 p-px">
      <div
        style={{ width: `${progress}%` }}
        className="h-full max-w-full rounded-full bg-sky-600"
      />
    </div>
  );
};

export default ProgressBar;
