function TechnologyCard({ item }) {
  if (!item) return null;

  const statusStyles = {
    hot: "bg-green-500/20 text-green-400",
    stable: "bg-blue-500/20 text-blue-400",
    emerging: "bg-orange-500/20 text-orange-400",
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-indigo-500 transition">
      <h4 className="text-white font-medium">{item.name}</h4>

      <p className="text-sm text-gray-400">{item.category}</p>

      <p className="text-sm text-indigo-400 mt-2">
        {item.companies} companies
      </p>

      <span
        className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
          statusStyles[item.status] || ""
        }`}
      >
        {item.status}
      </span>
    </div>
  );
}

export default TechnologyCard;