const toolOptions = {
  project: [
    "Jira",
    "Linear",
    "Notion",
    "ClickUp",
    "Asana",
  ],
  communication: [
    "Slack",
    "Microsoft Teams",
    "Discord",
    "Google Chat",
  ],
  ci: [
    "GitHub Actions",
    "GitLab CI",
    "Jenkins",
    "CircleCI",
  ],
  monitoring: [
    "Datadog",
    "Grafana",
    "Sentry",
    "New Relic",
  ],
};

function StepTools({ form, setForm }) {
  const toggleTool = (category, value) => {
    const current = form.tools?.[category] || [];

    const exists = current.includes(value);

    const updated = exists
      ? current.filter((t) => t !== value)
      : [...current, value];

    setForm({
      ...form,
      tools: {
        ...form.tools,
        [category]: updated,
      },
    });
  };

  const renderGroup = (title, key) => (
    <div>
      <p className="text-sm text-slate-300 mb-3">{title}</p>

      <div className="flex flex-wrap gap-2">
        {toolOptions[key].map((item) => {
          const selected = form.tools?.[key]?.includes(item);

          return (
            <button
              key={item}
              onClick={() => toggleTool(key, item)}
              className={`px-3 py-1 rounded-lg text-xs border transition
              ${
                selected
                  ? "bg-indigo-500 border-indigo-500 text-white"
                  : "bg-slate-800 border-slate-700 text-slate-300 hover:border-indigo-500"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">

      {/* TITLE */}
      <div>
        <h3 className="text-white text-lg font-semibold">
          Tools & platforms
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Tools used for managing, monitoring, and communication
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-8">

        {renderGroup("Project management", "project")}
        {renderGroup("Communication", "communication")}
        {renderGroup("CI / CD", "ci")}
        {renderGroup("Monitoring / APM", "monitoring")}

      </div>
    </div>
  );
}

export default StepTools;