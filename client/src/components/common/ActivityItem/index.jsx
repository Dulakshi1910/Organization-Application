function ActivityItem({ item }) {
  if (!item) return null;

  return (
    <div className="flex gap-3 items-start py-2 border-b border-slate-700">
      <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500" />
      <div>
        <p className="text-sm text-white">{item.text}</p>
        <span className="text-xs text-gray-400">{item.time}</span>
      </div>
    </div>
  );
}

export default ActivityItem;