const tabs = ["all", "active", "review"];

export default function OrganizationFilters({ query, setQuery }) {
  return (
    <div className="flex gap-3">
      {tabs.map((tab) => {
        const isActive = query.status === tab;

        return (
          <button
            key={tab}
            onClick={() => setQuery((prev) => ({ ...prev, status: tab }))}
            className={`px-4 py-1.5 rounded-full text-sm capitalize transition ${
              isActive
                ? "bg-indigo-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}