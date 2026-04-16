import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import MetricCard from "../../components/common/MetricCard";
import CompanyCard from "../../components/common/CompanyCard";
import OrgCard from "../../components/common/OrgCard";
import ActivityItem from "../../components/common/ActivityItem";
import PageContainer from "../../components/layout/PageContainer";

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
      setData(res);
    };

    loadData();
  }, []);

  const primaryMetrics = Array.isArray(data.metrics)
    ? data.metrics.slice(0, 4)
    : [];

  const secondaryMetrics = Array.isArray(data.metrics)
    ? data.metrics.slice(4, 8)
    : [];

  return (
    <PageContainer>
      <Sidebar />

      <div className="flex-1 px-6 md:px-8 py-6 bg-slate-900 min-h-screen">
        <Header />

        {/* Primary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {primaryMetrics.map((m) => (
            <MetricCard key={m.title} {...m} />
          ))}
        </div>

        {/* Secondary Metrics */}
        {secondaryMetrics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 opacity-90">
            {secondaryMetrics.map((m) => (
              <MetricCard key={m.title} {...m} />
            ))}
          </div>
        )}

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Organizations */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
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
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
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
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-sm font-semibold text-slate-200">
              Top Companies
            </h3>
            <span className="text-xs text-indigo-400 cursor-pointer">
              View all →
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(data.companies) &&
              data.companies.slice(0, 9).map((c) => (
                <CompanyCard key={c.name} company={c} />
              ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Dashboard;