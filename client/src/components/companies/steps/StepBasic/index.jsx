function StepBasic({ form, setForm }) {
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h3 className="text-white text-lg font-semibold">
          Basic information
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Identity and overview of the company
        </p>
      </div>

      {/* ROW 1 */}
      <div className="grid md:grid-cols-2 gap-6">
        <input
          placeholder="Company name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />

        <select
          value={form.industry}
          onChange={(e) =>
            setForm({ ...form, industry: e.target.value })
          }
          className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="">Select industry...</option>
          <option>FinTech</option>
          <option>SaaS / EdTech</option>
          <option>Cybersecurity</option>
          <option>E-Commerce</option>
          <option>Data & Analytics</option>
          <option>HealthTech</option>
          <option>AI / ML</option>
        </select>
      </div>

      {/* DESCRIPTION */}
      <textarea
        placeholder="Brief overview of the company..."
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
        className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl text-white text-sm h-28 resize-none placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />

      {/* ROW 2 */}
      <div className="grid md:grid-cols-3 gap-6">
        <input
          placeholder="Founded year"
          value={form.founded}
          onChange={(e) =>
            setForm({ ...form, founded: e.target.value })
          }
          className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />

        <input
          placeholder="Employees"
          value={form.employees}
          onChange={(e) =>
            setForm({ ...form, employees: e.target.value })
          }
          className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />

        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
          className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="active">Active</option>
          <option value="review">Review</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
}

export default StepBasic;