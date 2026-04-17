import { useEffect, useState } from "react";

function StepBasic({ form, setForm }) {
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    const loadOrgs = async () => {
      try {
        const res = await fetch('/api/organizations');
        const json = res.ok ? await res.json() : { data: [] };
        setOrgs(Array.isArray(json.data) ? json.data : []);
      } catch {
        setOrgs([]);
      }
    };
    loadOrgs();
  }, []);

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
      
      {/* ROW 3: website, brand color, tags */}
      <div className="grid md:grid-cols-3 gap-6 mt-4">
        <input
          placeholder="Website (optional)"
          value={form.website || ""}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
          className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />

        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-300">Brand color</label>
          <input
            type="color"
            value={form.brandColor || "#0d9488"}
            onChange={(e) => setForm({ ...form, brandColor: e.target.value })}
            className="w-12 h-12 p-0 border-0"
          />
        </div>

        <input
          placeholder="Tags (comma separated)"
          value={(form.tags || []).join(", ")}
          onChange={(e) =>
            setForm({ ...form, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })
          }
          className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* NOTES */}
      <textarea
        placeholder="Notes (optional)"
        value={form.notes || ""}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl text-white text-sm h-20 resize-none placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 mt-4"
      />

      {/* ROW 1 */}
      <div className="grid md:grid-cols-3 gap-6">
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

        <select
          value={form.org || ""}
          onChange={(e) => setForm({ ...form, org: e.target.value })}
          className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="">Select organization...</option>
          {orgs.map((o) => (
            <option key={o._id || o.id} value={o._id || o.id}>
              {o.name}
            </option>
          ))}
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
          <option value="inactive">Inactive</option>
          <option value="stealth">Stealth</option>
          <option value="acquired">Acquired</option>
        </select>
      </div>
    </div>
  );
}

export default StepBasic;