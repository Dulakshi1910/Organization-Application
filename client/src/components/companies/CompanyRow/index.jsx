import { useNavigate } from "react-router-dom";

function CompanyRow({ company }) {
  if (!company) return null;
  const navigate = useNavigate();
  // normalize tech (object → flat array)
  const techObj = company.tech || company.raw?.techStack || {};
  const techList = [
    ...(techObj.frontend || []),
    ...(techObj.backend || []),
    ...(techObj.database || []),
    ...(techObj.devops || []),
  ].filter(Boolean);

  const cloud = techObj.cloud ? [techObj.cloud] : [];
  const totalTechCount = techList.length + cloud.length;

  const gridCols = "2.8fr 1.6fr 1fr 2.8fr 1fr 1.2fr 1.2fr"; 
  // Map raw status -> label, color, tooltip
  const statusMeta = (() => {
    const s = (company.status || "").toLowerCase();
    const map = {
      active: {
        label: "Active",
        class: "text-green-400",
        tooltip: "Operating now — actively shipping and hiring.",
      },
      inactive: {
        label: "Inactive",
        class: "text-slate-400",
        tooltip: "Not active — operations paused or dormant.",
      },
      stealth: {
        label: "Stealth",
        class: "text-indigo-300",
        tooltip: "Stealth mode — limited public information (pre-launch).",
      },
      acquired: {
        label: "Acquired",
        class: "text-blue-300",
        tooltip: "Acquired — ownership transferred to another company.",
      },
    };
    return map[s] || { label: (company.status || "").toString(), class: "text-slate-300", tooltip: "" };
  })();

  return (
    <div
      onClick={() => navigate(`/companies/${company.id}`, { state: { orgId: company.organization } })}
      className="grid items-center px-6 py-4 text-sm border-b border-slate-800 hover:bg-slate-800/40 transition cursor-pointer"
      style={{ gridTemplateColumns: gridCols }}
    >
      {/* COMPANY */}
      <div className="min-w-0">
        <p className="text-white font-medium truncate">
          {company.name}
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
        {techList.length + cloud.length > 0 ? (
          <>
            {techList.slice(0, 3).map((t, i) => (
              <span
                key={i}
                className="bg-slate-700/80 px-2 py-1 rounded-md text-xs text-slate-200"
              >
                {t}
              </span>
            ))}

            {cloud.length > 0 && techList.length < 3 && (
              <span className="bg-slate-700/80 px-2 py-1 rounded-md text-xs text-slate-200">
                {cloud[0]}
              </span>
            )}

            {totalTechCount > 3 && (
              <span
                className="bg-slate-700/60 px-2 py-1 rounded-md text-xs text-slate-300 cursor-help"
                title={
                  `Frontend: ${techObj.frontend?.join(", ") || "-"}\n` +
                  `Backend: ${techObj.backend?.join(", ") || "-"}\n` +
                  `Database: ${techObj.database?.join(", ") || "-"}\n` +
                  `DevOps: ${techObj.devops?.join(", ") || "-"}\n` +
                  `Cloud: ${techObj.cloud || "-"}`
                }
              >
                +{totalTechCount - 3}
              </span>
            )}
          </>
        ) : (
          <span className="text-xs text-slate-500">-</span>
        )}
      </div>

      {/* STATUS */}
      <span className={`text-xs font-medium ${statusMeta.class}`} title={statusMeta.tooltip}>
        {statusMeta.label}
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