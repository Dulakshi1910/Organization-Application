import { useState } from "react";

const architectureOptions = [
  "Monolith",
  "Microservices",
  "Event-Driven",
  "Serverless",
  "Headless / Composable",
  "Data Mesh",
  "Hybrid",
];

const methodologyOptions = [
  "Scrum",
  "Kanban",
  "SAFe Agile",
  "Shape Up",
  "XP",
  "Waterfall",
  "Lean",
];

const lifecycleOptions = [
  "Continuous Delivery",
  "Continuous Deployment",
  "Weekly Sprints",
  "Biweekly Sprints",
  "Monthly",
  "Quarterly",
  "Annual",
];

function StepArchitecture({ form, setForm }) {
  const toggleSelect = (field, value) => {
    setForm({
      ...form,
      [field]: form[field] === value ? "" : value,
    });
  };

  return (
    <div className="space-y-8">

      {/* TITLE */}
      <div>
        <h3 className="text-white text-lg font-semibold">
          Architecture & process
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          How the system is structured and how the team works
        </p>
      </div>

      {/* ARCHITECTURE */}
      <div>
        <label className="text-sm text-slate-300">
          System architecture
        </label>

        <div className="flex flex-wrap gap-2 mt-3">
          {architectureOptions.map((item) => (
            <button
              key={item}
              onClick={() => toggleSelect("architecture", item)}
              className={`px-3 py-1 rounded-lg text-xs border transition
              ${
                form.architecture === item
                  ? "bg-indigo-500 border-indigo-500 text-white"
                  : "bg-slate-800 border-slate-700 text-slate-300 hover:border-indigo-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* METHODOLOGY */}
      <div>
        <label className="text-sm text-slate-300">
          Development methodology
        </label>

        <div className="flex flex-wrap gap-2 mt-3">
          {methodologyOptions.map((item) => (
            <button
              key={item}
              onClick={() => toggleSelect("methodology", item)}
              className={`px-3 py-1 rounded-lg text-xs border transition
              ${
                form.methodology === item
                  ? "bg-indigo-500 border-indigo-500 text-white"
                  : "bg-slate-800 border-slate-700 text-slate-300 hover:border-indigo-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* LIFECYCLE */}
      <div>
        <label className="text-sm text-slate-300">
          Release / delivery lifecycle
        </label>

        <div className="flex flex-wrap gap-2 mt-3">
          {lifecycleOptions.map((item) => (
            <button
              key={item}
              onClick={() => toggleSelect("lifecycle", item)}
              className={`px-3 py-1 rounded-lg text-xs border transition
              ${
                form.lifecycle === item
                  ? "bg-indigo-500 border-indigo-500 text-white"
                  : "bg-slate-800 border-slate-700 text-slate-300 hover:border-indigo-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* SLIDERS */}
      <div className="space-y-6">

        {/* TEST COVERAGE */}
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Test coverage</span>
            <span>{form.testCoverage || 0}%</span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={form.testCoverage || 0}
            onChange={(e) =>
              setForm({
                ...form,
                testCoverage: Number(e.target.value),
              })
            }
            className="w-full accent-indigo-500"
          />
        </div>

        {/* TECH DEBT */}
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Tech debt level</span>
            <span>{form.techDebt || 0}%</span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={form.techDebt || 0}
            onChange={(e) =>
              setForm({
                ...form,
                techDebt: Number(e.target.value),
              })
            }
            className="w-full accent-indigo-500"
          />
        </div>

      </div>
    </div>
  );
}

export default StepArchitecture;