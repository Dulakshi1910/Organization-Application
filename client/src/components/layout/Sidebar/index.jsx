import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiLayers,
  FiBriefcase,
  FiActivity,
  FiMap,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const baseClass =
    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition";

  const inactiveClass =
    "text-gray-400 hover:bg-[#1F2937] hover:text-white";

  const activeClass =
    "bg-[#1F2937] text-white";

  
  const navItems = [
    { name: "Dashboard", path: "/", icon: FiHome, end: true },
    { name: "Organizations", path: "/organizations", icon: FiLayers },
    { name: "Companies", path: "/companies", icon: FiBriefcase },
    { name: "Tech Radar", path: "/tech-radar", icon: FiActivity }, 
  ];

  
  const futureItems = [
    { name: "Architecture Map", icon: FiMap },
    { name: "Settings", icon: FiSettings },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-[#0F172A] border-r border-[#1F2937] flex flex-col py-6 transition-all duration-300 z-50
      ${collapsed ? "w-20 px-3" : "w-64 px-5"}`}
    >
      {/* Top */}
      <div className="flex items-center justify-between mb-8">
        {!collapsed && (
          <h1 className="text-xl font-semibold text-white">
            Org<span className="text-indigo-400">Lytics</span>
          </h1>
        )}

        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="text-gray-400 hover:text-white"
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      {/* Scrollable Nav */}
      <nav className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
        {/* Main */}
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `${baseClass} ${
                  isActive ? activeClass : inactiveClass
                }`
              }
            >
              <Icon className="text-lg min-w-[20px]" />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}

        {/* Future */}
        <div className="mt-4 flex flex-col gap-2">
          {futureItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.name}
                className={`${baseClass} text-gray-500 cursor-not-allowed`}
              >
                <Icon className="text-lg min-w-[20px]" />
                {!collapsed && <span>{item.name}</span>}
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;