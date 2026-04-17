function TechnologyFilters({ category, setCategory, categories = [] }) {
  // ensure 'All' is first option
  const opts = Array.isArray(categories) && categories.length > 0 ? ["All", ...categories] : ["All", "Frontend", "Backend", "Database", "DevOps", "Cloud"];

  return (
    <div className="flex flex-wrap gap-2">
      {opts.map((item) => (
        <button
          key={item}
          onClick={() => setCategory(item)}
          className={`px-4 py-2 rounded-full text-sm border transition ${
            category === item
              ? "bg-indigo-600 text-white border-indigo-600"
              : "border-gray-600 text-gray-300 hover:bg-gray-700"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default TechnologyFilters;