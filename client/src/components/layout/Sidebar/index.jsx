function Sidebar() {
  return (
    <div className="w-64 h-screen bg-[#0F172A] border-r border-[#1F2937] flex flex-col px-5 py-6">
      <h1 className="text-xl font-semibold text-white mb-8">
        Org<span className="text-indigo-400">Lytics</span>
      </h1>

      <nav className="flex flex-col gap-2 text-sm">
        <span className="px-3 py-2 rounded-lg bg-[#1F2937] text-white">
          Dashboard
        </span>
        <span className="px-3 py-2 rounded-lg text-gray-400 hover:bg-[#1F2937]">
          Organizations
        </span>
        <span className="px-3 py-2 rounded-lg text-gray-400 hover:bg-[#1F2937]">
          Companies
        </span>
        <span className="px-3 py-2 rounded-lg text-gray-400 hover:bg-[#1F2937]">
          Tech Radar
        </span>
        <span className="px-3 py-2 rounded-lg text-gray-400 hover:bg-[#1F2937]">
          Architecture Map
        </span>
        <span className="px-3 py-2 rounded-lg text-gray-400 hover:bg-[#1F2937]">
          Settings
        </span>
      </nav>
    </div>
  );
}

export default Sidebar;