import { useEffect, useState, useMemo } from "react";

import MetricCard from "../../components/common/MetricCard";
import CompanyCard from "../../components/common/CompanyCard";
import OrgCard from "../../components/common/OrgCard";
import ActivityItem from "../../components/common/ActivityItem";

import { getDashboardData } from "../../services/dashboardService";

function Dashboard() {
  const [data, setData] = useState({
    metrics: [],
    companies: [],
    orgs: [],
    activity: [],
  });

  useEffect(() => {
    const loadData = async () => {
      const res = await getDashboardData();
      setData(res || {});
    };

    loadData();
  }, []);

  const filteredMetrics = useMemo(() => {
    const allowed = [
      "Total Companies",
      "Employees",
      "Tech Assets",
      "Active Signals",
    ];

    return Array.isArray(data.metrics)
      ? data.metrics.filter((m) => allowed.includes(m.title))
      : [];
  }, [data.metrics]);

  return (
    <div className="w-full min-w-0 space-y-8">
      {/* Metrics */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMetrics.map((m) => (
          <MetricCard key={m.title} {...m} />
        ))}
      </div>

      {/* Main Section */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Organizations */}
        <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-slate-200">
              Organizations
            </h3>
            <span className="text-xs text-indigo-400 cursor-pointer">
              View all →
            </span>
          </div>

          {Array.isArray(data.orgs) &&
            data.orgs.slice(0, 5).map((o) => (
              <OrgCard key={o.name} org={o} />
            ))}
        </div>

        {/* Activity */}
        <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-slate-200">
              Activity Feed
            </h3>
            <span className="text-xs text-indigo-400 cursor-pointer">
              All signals →
            </span>
          </div>

          {Array.isArray(data.activity) &&
            data.activity.slice(0, 10).map((a, i) => (
              <ActivityItem key={i} item={a} />
            ))}
        </div>
      </div>

      {/* Companies */}
      <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-sm font-semibold text-slate-200">
            Top Companies
          </h3>
          <span className="text-xs text-indigo-400 cursor-pointer">
            View all →
          </span>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(data.companies) &&
            data.companies.slice(0, 9).map((c) => (
              <CompanyCard key={c.name} company={c} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;