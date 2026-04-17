function TechnologyStats({ data }) {
  if (!Array.isArray(data)) return null;

  const total = data.reduce((sum, item) => sum + (item.companies || 0), 0);

  return (
    <div className="">
      {/* Distribution (only) */}
      <div className="bg-gray-900 p-5 rounded-xl border border-gray-800">
        <h3 className="text-white mb-4">Technology distribution</h3>

        {data.map((item) => {
          const percent = total ? (item.companies / total) * 100 : 0;

          return (
            <div key={item.id} className="mb-3">
              <div className="flex justify-between text-sm text-gray-400">
                <span>{item.name}</span>
                <span>{item.companies}</span>
              </div>

              <div className="h-2 bg-gray-800 rounded">
                <div
                  className="h-2 bg-indigo-500 rounded"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TechnologyStats;