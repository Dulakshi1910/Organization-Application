function ProgressBar({ value = 0 }) {
  return (
    <div className="w-full h-2 bg-slate-700 rounded-full">
      <div
        className="h-2 bg-indigo-500 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default ProgressBar;