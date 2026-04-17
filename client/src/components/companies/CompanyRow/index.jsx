function CompanyRow({ company }) {
  if (!company) return null;

  // normalize tech (object → flat array)
  const techList = company.tech
    ? Object.values(company.tech).flat().filter(Boolean)
    : [];

  const gridCols = "2.8fr 1.6fr 1fr 2.8fr 1fr 1.2fr 1.2fr"; 

  return (
    <div
      className="grid items-center px-6 py-4 text-sm border-b border-slate-800 hover:bg-slate-800/40 transition"
      style={{ gridTemplateColumns: gridCols }}
    >
      {/* COMPANY */}
      <div className="min-w-0">
        <p className="text-white font-medium truncate">
          {company.name}
        </p>
        <p className="text-xs text-slate-400 truncate">
          {company.description}
        </p>
      </div>

      {/* ORG */}
      <span className="text-indigo-400 text-xs truncate">
        {company.org}
      </span>

      {/* EMPLOYEES */}
      <span className="text-slate-300">
        {company.employees}
      </span>

      {/* STACK */}
      <div className="flex flex-wrap gap-2">
        {techList.length > 0 ? (
          techList.slice(0, 3).map((t, i) => (
            <span
              key={i}
              className="bg-slate-700/80 px-2 py-1 rounded-md text-xs text-slate-200"
            >
              {t}
            </span>
          ))
        ) : (
          <span className="text-xs text-slate-500">-</span>
        )}
      </div>

      {/* STATUS */}
      <span
        className={`text-xs font-medium ${
          company.status === "active"
            ? "text-green-400"
            : "text-yellow-400"
        }`}
      >
        {company.status}
      </span>

      {/* FOUNDED */}
      <span className="text-slate-300 text-xs">
        {company.founded || "-"}
      </span>

      {/* UPDATED */}
      <span className="text-slate-400 text-xs">
        {company.updated}
      </span>
    </div>
  );
}

export default CompanyRow;