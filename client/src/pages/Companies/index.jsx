import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import PageContainer from "../../components/layout/PageContainer";

import CompanyTable from "../../components/companies/CompanyTable";
import CompanyTabs from "../../components/companies/CompanyTabs";

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

    // SEARCH
    if (search) {
      data = data.filter((c) =>
        c.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // FILTER
    if (filter === "Active") {
      data = data.filter((c) => c.status === "active");
    }

    if (filter === "Review") {
      data = data.filter((c) => c.status === "review");
    }

    return data;
  }, [companies, search, filter]);

  return (
    <PageContainer>
      <Sidebar />

      <div className="flex-1 px-8 py-6 bg-slate-950 min-h-screen">
        <Header />

        {/* NAV ONLY */}
        <CompanyTabs />

        {/* TOOLBAR (FIXED ALIGNMENT) */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 mt-4">

          {/* LEFT: search + filters */}
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
                  className={`px-3 py-1 rounded-full text-xs transition
                    ${
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

          {/* RIGHT: action */}
          <button
            onClick={() => navigate("/companies/create")}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-sm text-white"
          >
            + Add Company
          </button>
        </div>

        <CompanyTable data={filtered} />
      </div>
    </PageContainer>
  );
}

export default Companies;