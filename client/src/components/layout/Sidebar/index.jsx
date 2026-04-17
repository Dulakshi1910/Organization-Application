import { NavLink } from "react-router-dom";

function Sidebar() {
  const baseClass =
    "px-3 py-2 rounded-lg text-sm transition";

  const inactiveClass =
    "text-gray-400 hover:bg-[#1F2937] hover:text-white";

  const activeClass =
    "bg-[#1F2937] text-white";

  return (
    <div className="w-64 h-screen bg-[#0F172A] border-r border-[#1F2937] flex flex-col px-5 py-6">
      <h1 className="text-xl font-semibold text-white mb-8">
        Org<span className="text-indigo-400">Lytics</span>
      </h1>

      <nav className="flex flex-col gap-2">
        {/* Dashboard */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Dashboard
        </NavLink>

        {/* Organizations (not implemented yet) */}
        <span className={`${baseClass} ${inactiveClass}`}>
          Organizations
        </span>

        {/* Companies */}
        <NavLink
          to="/companies"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Companies
        </NavLink>

        {/* Other (future) */}
        <span className={`${baseClass} ${inactiveClass}`}>
          Tech Radar
        </span>

        <span className={`${baseClass} ${inactiveClass}`}>
          Architecture Map
        </span>

        <span className={`${baseClass} ${inactiveClass}`}>
          Settings
        </span>
      </nav>
    </div>
  );
}

export default Sidebar;