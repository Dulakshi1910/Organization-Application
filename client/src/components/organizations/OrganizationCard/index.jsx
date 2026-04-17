export default function OrganizationCard({ org }) {
  if (!org) return null;

  
  const name = org?.name || "Unnamed Organization";
  const companies = org?.companies ?? 0;
  const employees = org?.employees ?? 0;
  const health = org?.health ?? 0;
  const tags = Array.isArray(org?.tags) ? org.tags : [];
  const companiesPreview = Array.isArray(org?.companiesPreview) ? org.companiesPreview : [];

  const isActive = org?.status === "active";
  const isHealthy = health >= 75;

  return (
    <div className="bg-[#0F172A] border border-gray-800 rounded-xl p-5 space-y-4 hover:border-gray-700 transition">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-white text-sm font-semibold">
            {name}
          </h3>

          <p className="text-xs text-gray-400 mt-1">
            {companies} companies · {employees} employees
          </p>
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full ${
            isActive
              ? "bg-green-500/10 text-green-400"
              : "bg-orange-500/10 text-orange-400"
          }`}
        >
          {isActive ? "Active" : "Review"}
        </span>
      </div>

      {/* Health */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-400">
          <span>Health</span>
          <span>{health}%</span>
        </div>

        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              isHealthy ? "bg-green-400" : "bg-orange-400"
            }`}
            style={{ width: `${health}%` }}
          />
        </div>
      </div>

      {/* Companies preview as pills */}
      <div className="flex flex-wrap gap-2">
        {companiesPreview.length > 0 ? (
          companiesPreview.slice(0, 6).map((c) => (
            <span
              key={c.id}
              className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded-md truncate max-w-[160px]"
              title={c.name}
            >
              {c.name}
            </span>
          ))
        ) : (
          <span className="text-xs text-gray-500">No companies</span>
        )}
      </div>
    </div>
  );
}