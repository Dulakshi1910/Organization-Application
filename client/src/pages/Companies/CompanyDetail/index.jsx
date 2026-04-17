import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCompanyById } from "../../../services/companyService";

function CompanyDetail() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const c = await getCompanyById(companyId);
      setCompany(c);
      setLoading(false);
    };
    load();
  }, [companyId]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!company) return <div className="p-6">Company not found</div>;

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl text-white font-semibold">{company.name}</h1>
          <p className="text-slate-400 mt-2">{company.description}</p>
          <div className="mt-4 text-sm text-slate-300">
            <div><strong>Industry:</strong> {company.industry || "-"}</div>
            <div><strong>Organization:</strong> {company.organization?.name || company.organization || "-"}</div>
            <div><strong>Employees:</strong> {company.employees || 0}</div>
            <div><strong>Founded:</strong> {company.foundedYear || "-"}</div>
          </div>
        </div>
        <div>
          <button onClick={() => navigate(-1)} className="px-4 py-2 bg-slate-800 text-white rounded">Back</button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="p-4 bg-slate-800 rounded">
          <h3 className="text-white font-medium">Tech Stack</h3>
          <div className="mt-2 text-sm text-slate-300">
            <div><strong>Frontend:</strong> {(company.techStack?.frontend || []).join(", ") || "-"}</div>
            <div><strong>Backend:</strong> {(company.techStack?.backend || []).join(", ") || "-"}</div>
            <div><strong>Database:</strong> {(company.techStack?.database || []).join(", ") || "-"}</div>
            <div><strong>DevOps:</strong> {(company.techStack?.devops || []).join(", ") || "-"}</div>
            <div><strong>Cloud:</strong> {company.techStack?.cloud || "-"}</div>
          </div>
        </div>

        <div className="p-4 bg-slate-800 rounded">
          <h3 className="text-white font-medium">Engineering Health</h3>
          <div className="mt-2 text-sm text-slate-300">
            <div><strong>Test Coverage:</strong> {company.engineeringHealth?.testCoverage ?? "-"}</div>
            <div><strong>Tech Debt:</strong> {company.engineeringHealth?.techDebt ?? "-"}</div>
            <div><strong>Uptime:</strong> {company.engineeringHealth?.uptime ?? "-"}%</div>
          </div>
        </div>

        <div className="p-4 bg-slate-800 rounded col-span-2">
          <h3 className="text-white font-medium">Tools & Notes</h3>
          <div className="mt-2 text-sm text-slate-300">
            <div><strong>Project Management:</strong> {company.tools?.projectManagement || "-"}</div>
            <div><strong>Communication:</strong> {company.tools?.communication || "-"}</div>
            <div><strong>CICD:</strong> {company.tools?.cicd || "-"}</div>
            <div><strong>Monitoring:</strong> {company.tools?.monitoring || "-"}</div>
            <div className="mt-3"><strong>Notes:</strong> {company.notes || "-"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;
