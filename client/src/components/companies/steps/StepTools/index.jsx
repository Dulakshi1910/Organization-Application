const projectOptions = [
  "Jira",
  "Linear",
  "Notion",
  "Asana",
  "Trello",
  "Azure DevOps",
  "GitHub Projects",
  "ClickUp",
  "Other",
];

const communicationOptions = [
  "Slack",
  "Microsoft Teams",
  "Discord",
  "Google Chat",
  "Email",
  "Other",
];

const cicdOptions = [
  "GitHub Actions",
  "GitLab CI",
  "Jenkins",
  "CircleCI",
  "Buildkite",
  "Azure Pipelines",
  "Other",
];

const monitoringOptions = [
  "Datadog",
  "Grafana",
  "Sentry",
  "New Relic",
  "Elastic APM",
  "CloudWatch",
  "Prometheus",
  "Other",
];

function StepTools({ form, setForm }) {
  const setTool = (key, value) => {
    setForm({
      ...form,
      tools: {
        ...form.tools,
        [key]: value || undefined,
      },
    });
  };

  return (
    <div className="space-y-8">

      {/* TITLE */}
      <div>
        <h3 className="text-white text-lg font-semibold">Tools & platforms</h3>
        <p className="text-xs text-slate-400 mt-1">
          Tools used for managing, monitoring, and communication
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-8">

        <div>
          <p className="text-sm text-slate-300 mb-3">Project management</p>
          <select
            value={form.tools?.projectManagement || ""}
            onChange={(e) => setTool("projectManagement", e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white text-sm"
          >
            <option value="">Select project tool...</option>
            {projectOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-sm text-slate-300 mb-3">Communication</p>
          <select
            value={form.tools?.communication || ""}
            onChange={(e) => setTool("communication", e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white text-sm"
          >
            <option value="">Select communication...</option>
            {communicationOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-sm text-slate-300 mb-3">CI / CD</p>
          <select
            value={form.tools?.cicd || ""}
            onChange={(e) => setTool("cicd", e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white text-sm"
          >
            <option value="">Select CI/CD...</option>
            {cicdOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-sm text-slate-300 mb-3">Monitoring / APM</p>
          <select
            value={form.tools?.monitoring || ""}
            onChange={(e) => setTool("monitoring", e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white text-sm"
          >
            <option value="">Select monitoring...</option>
            {monitoringOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
}

export default StepTools;