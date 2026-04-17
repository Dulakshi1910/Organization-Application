import { useState } from "react";

function StepTech({ form, setForm }) {
  const [inputs, setInputs] = useState({
    frontend: "",
    backend: "",
    database: "",
    devops: "",
    cloud: "",
  });

  const handleAdd = (type, e) => {
    if (e.key === "Enter" && inputs[type].trim()) {
      e.preventDefault();

      const value = inputs[type].trim();

      setForm({
        ...form,
        tech: {
          ...form.tech,
          [type]: [...(form.tech?.[type] || []), value],
        },
      });

      setInputs({ ...inputs, [type]: "" });
    }
  };

  const removeItem = (type, index) => {
    const updated = form.tech[type].filter((_, i) => i !== index);

    setForm({
      ...form,
      tech: {
        ...form.tech,
        [type]: updated,
      },
    });
  };

  const renderTags = (type) => (
    <div className="flex flex-wrap gap-2 mt-2">
      {form.tech?.[type]?.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-2 bg-slate-700 px-3 py-1 rounded-lg text-xs text-white"
        >
          {item}
          
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white text-lg font-semibold">
          Tech stack
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Languages, frameworks, databases, and infrastructure
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* FRONTEND */}
        <div>
          <label className="text-sm text-slate-300">
            Frontend technologies
          </label>
          <input
            placeholder="Type and press Enter..."
            value={inputs.frontend}
            onChange={(e) =>
              setInputs({ ...inputs, frontend: e.target.value })
            }
            onKeyDown={(e) => handleAdd("frontend", e)}
            className="mt-2 w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white text-sm"
          />
          {renderTags("frontend")}
        </div>

        {/* BACKEND */}
        <div>
          <label className="text-sm text-slate-300">
            Backend / API
          </label>
          <input
            placeholder="e.g. Node.js, FastAPI"
            value={inputs.backend}
            onChange={(e) =>
              setInputs({ ...inputs, backend: e.target.value })
            }
            onKeyDown={(e) => handleAdd("backend", e)}
            className="mt-2 w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white text-sm"
          />
          {renderTags("backend")}
        </div>

        {/* DATABASE */}
        <div>
          <label className="text-sm text-slate-300">
            Databases
          </label>
          <input
            placeholder="e.g. PostgreSQL, MongoDB"
            value={inputs.database}
            onChange={(e) =>
              setInputs({ ...inputs, database: e.target.value })
            }
            onKeyDown={(e) => handleAdd("database", e)}
            className="mt-2 w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white text-sm"
          />
          {renderTags("database")}
        </div>

        {/* DEVOPS */}
        <div>
          <label className="text-sm text-slate-300">
            DevOps / Infrastructure
          </label>
          <input
            placeholder="e.g. Docker, Kubernetes"
            value={inputs.devops}
            onChange={(e) =>
              setInputs({ ...inputs, devops: e.target.value })
            }
            onKeyDown={(e) => handleAdd("devops", e)}
            className="mt-2 w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white text-sm"
          />
          {renderTags("devops")}
        </div>

        {/* CLOUD */}
        <div>
          <label className="text-sm text-slate-300">Cloud provider</label>
          <select
            value={form.tech?.cloud || inputs.cloud}
            onChange={(e) => {
              setForm({ ...form, tech: { ...(form.tech || {}), cloud: e.target.value } });
              setInputs({ ...inputs, cloud: e.target.value });
            }}
            className="mt-2 w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white text-sm"
          >
            <option value="">Select cloud...</option>
            <option>AWS</option>
            <option>GCP</option>
            <option>Azure</option>
            <option>Vercel</option>
            <option>Cloudflare</option>
            <option>DigitalOcean</option>
            <option>On-premise</option>
            <option>Hybrid</option>
            <option>Other</option>
          </select>
        </div>

      </div>
    </div>
  );
}

export default StepTech;