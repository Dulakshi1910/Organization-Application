import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

import MetricCard from "../../components/common/MetricCard";
import CompanyCard from "../../components/common/CompanyCard";
import OrgCard from "../../components/common/OrgCard";
import ActivityItem from "../../components/common/ActivityItem";
import TechChip from "../../components/ui/TechChip";

import { getDashboardData } from "../../services/dashboardService";

function Dashboard() {
  const [data, setData] = useState({
    metrics: [],
    companies: [],
    orgs: [],
    activity: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await getDashboardData();
        setData(res || {});
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredMetrics = useMemo(() => {
    const allowed = [
      "Total Companies",
      "Total Employees",
      "Active Companies",
      "Organizations",
    ];

    return Array.isArray(data.metrics)
      ? data.metrics.filter((m) => allowed.includes(m.title))
      : [];
  }, [data.metrics]);

  return (
    <div className="w-full min-w-0 space-y-8">
      {/* Metrics */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? [0, 1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-slate-800 rounded-lg p-4 animate-pulse" />
            ))
          : filteredMetrics.map((m) => (
              <MetricCard key={m.title} {...m} />
            ))}
      </div>

      {/* Top Technologies */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-slate-200">Top Frontend Tech</h3>
            <Link to="/tech-radar" className="text-xs text-indigo-400">View all →</Link>
          </div>

          <div className="flex flex-col gap-3">
            {loading
              ? [0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-6 bg-slate-800 rounded animate-pulse" />
                    </div>
                    <div className="w-12 h-4 bg-slate-800 rounded animate-pulse" />
                  </div>
                ))
              : (data.raw?.topTechnologies?.frontend || data.raw?.top_technologies?.frontend || []).slice(0, 3).map((t, i) => (
                  <div key={t.tech || t._id || i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TechChip label={t.tech || t._id || t} />
                    </div>
                    <span className="text-xs text-gray-400">{t.usedBy ?? t.count ?? 0} uses</span>
                  </div>
                ))}
          </div>
        </div>

        <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-slate-200">Top Backend Tech</h3>
            <Link to="/tech-radar" className="text-xs text-indigo-400">View all →</Link>
          </div>

          <div className="flex flex-col gap-3">
            {loading
              ? [0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-6 bg-slate-800 rounded animate-pulse" />
                    </div>
                    <div className="w-12 h-4 bg-slate-800 rounded animate-pulse" />
                  </div>
                ))
              : (data.raw?.topTechnologies?.backend || data.raw?.top_technologies?.backend || []).slice(0, 3).map((t, i) => (
                  <div key={t.tech || t._id || i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TechChip label={t.tech || t._id || t} />
                    </div>
                    <span className="text-xs text-gray-400">{t.usedBy ?? t.count ?? 0} uses</span>
                  </div>
                ))}
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Organizations */}
        <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-slate-200">
              Organizations
            </h3>
              <Link to="/organizations" className="text-xs text-indigo-400">
                View all →
              </Link>
          </div>

          {loading
            ? [0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-slate-800 rounded-md animate-pulse" />
              ))
            : Array.isArray(data.orgs) &&
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
            <span className="text-xs text-indigo-400">All signals →</span>
          </div>

          {loading
            ? [0, 1, 2, 3].map((i) => (
                <div key={i} className="h-10 bg-slate-800 rounded-md animate-pulse" />
              ))
            : Array.isArray(data.activity) &&
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
          <Link to="/companies" className="text-xs text-indigo-400">
            View all →
          </Link>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? [0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-28 bg-slate-800 rounded-md animate-pulse" />
              ))
            : Array.isArray(data.companies) &&
                data.companies.slice(0, 9).map((c) => (
                  <CompanyCard key={c.name} company={c} />
                ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;