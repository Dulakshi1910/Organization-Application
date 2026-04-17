import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import CompanyTable from "../../components/companies/CompanyTable";


import { getCompanies } from "../../services/companyService";

function Companies() {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const load = async () => {
      const res = await getCompanies();
      setCompanies(Array.isArray(res) ? res : []);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    let data = [...companies];

    if (search) {
      data = data.filter((c) =>
        c.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter === "Active") {
      data = data.filter((c) => c.status === "active");
    }

    if (filter === "Review") {
      data = data.filter((c) => c.status === "review");
    }

    return data;
  }, [companies, search, filter]);

  return (
    <div className="space-y-6">
      

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <input
            placeholder="Search companies..."
            className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-sm text-white w-72 md:w-80 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex gap-2">
            {["All", "Active", "Review"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-xs transition ${
                  filter === f
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate("/companies/create")}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-sm text-white"
        >
          + Add Company
        </button>
      </div>

      <CompanyTable data={filtered} />
    </div>
  );
}

export default Companies;