import CompanyRow from "../CompanyRow";

function CompanyTable({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center py-10 text-slate-400 text-sm">
        No companies found
      </div>
    );
  }

  const gridCols =
    "2.8fr 1.6fr 1fr 2.8fr 1fr 1.2fr 1.2fr";

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">

      {/* HEADER */}
      <div
        className="grid px-6 py-4 text-xs tracking-wide text-slate-500 border-b border-slate-800"
        style={{ gridTemplateColumns: gridCols }}
      >
        <span>COMPANY</span>
        <span>ORGANIZATION</span>
        <span>EMPLOYEES</span>
        <span>STACK</span>
        <span>STATUS</span>
        <span>FOUNDED</span>
        <span>UPDATED</span>
      </div>

      {/* ROWS */}
      <div className="divide-y divide-slate-800">
        {data.map((c) => (
          <CompanyRow
            key={c.id}
            company={c}
            gridCols={gridCols} 
          />
        ))}
      </div>
    </div>
  );
}

export default CompanyTable;