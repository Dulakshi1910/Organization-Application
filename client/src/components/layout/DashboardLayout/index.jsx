import { useState } from "react";
import Sidebar from "../Sidebar";
import { NavLink, useLocation } from "react-router-dom";

function DashboardLayout({ children }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const showTabs = [
    "/organizations",
    "/companies",
    "/tech-radar",
    "/architecture-map",
  ].some((path) => location.pathname.startsWith(path));

  const tabs = [
    { name: "Summary", path: "/" },
    { name: "Organizations", path: "/organizations" },
    { name: "Companies", path: "/companies" },
    { name: "Tech Radar", path: "/tech-radar" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#0B1220] text-gray-200 overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Content Wrapper */}
      <div
        className={`w-full min-h-screen transition-all duration-300 ${
          collapsed ? "pl-20" : "pl-64"
        }`}
      >
        <div className="w-full max-w-none flex flex-col min-h-screen">
          
          {/* Header */}
          <div className="w-full px-6 pt-6">
            <h1 className="text-xl font-semibold text-white">Dashboard</h1>
            <p className="text-sm text-gray-400">Overview</p>

            {showTabs && (
              <div className="flex gap-6 mt-6 border-b border-gray-800 pb-2 text-sm w-full">
                {tabs.map((tab) => (
                  <NavLink
                    key={tab.name}
                    to={tab.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-white border-b-2 border-indigo-500 pb-1"
                        : "text-gray-400 hover:text-white"
                    }
                  >
                    {tab.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Page Content */}
          <div className="flex-1 w-full max-w-none px-6 py-4 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;