import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    // ── Relationship ────────────────────────────────────────────
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: [true, "Organization reference is required"],
      index: true,
    },

    // ── Basic Info ──────────────────────────────────────────────
    name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    industry: {
      type: String,
      trim: true,
      enum: [
        "FinTech",
        "SaaS / EdTech",
        "Cybersecurity",
        "E-Commerce",
        "Data & Analytics",
        "HealthTech",
        "PropTech",
        "Logistics / Supply Chain",
        "AI / ML",
        "Other",
      ],
    },
    description: {
      type: String,
      trim: true,
    },
    foundedYear: {
      type: Number,
    },
    employees: {
      type: Number,
      min: 0,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "stealth", "acquired"],
      default: "active",
    },
    brandColor: {
      type: String,
      default: "#0d9488",
    },
    website: {
      type: String,
      trim: true,
    },

    // ── Tech Stack ──────────────────────────────────────────────
    techStack: {
      frontend: { type: [String], default: [] },
      backend:  { type: [String], default: [] },
      database: { type: [String], default: [] },
      devops:   { type: [String], default: [] },
      cloud: {
        type: String,
        enum: ["AWS", "GCP", "Azure", "Vercel", "Cloudflare", "DigitalOcean", "On-premise", "Hybrid", "Other"],
      },
    },

    // ── Architecture & Process ──────────────────────────────────
    architecture: {
      type: String,
      enum: [
        "Monolith",
        "Microservices",
        "Event-Driven",
        "Serverless",
        "Headless / Composable",
        "Data Mesh",
        "Hybrid",
        "Other",
      ],
    },
    methodology: {
      type: String,
      enum: [
        "Scrum",
        "Kanban",
        "SAFe Agile",
        "Shape Up",
        "XP",
        "Traditional Waterfall",
        "Lean",
        "Other",
      ],
    },
    lifecycle: {
      type: String,
      enum: [
        "Continuous Delivery",
        "Continuous Deployment",
        "Weekly Sprints",
        "Biweekly Sprints",
        "Monthly",
        "Quarterly",
        "Annual",
        "Other",
      ],
    },

    // ── Engineering Health ──────────────────────────────────────
    engineeringHealth: {
      testCoverage: { type: Number, min: 0, max: 100, default: 0 },
      techDebt:     { type: Number, min: 0, max: 100, default: 0 },
      uptime:       { type: Number, min: 0, max: 100, default: 99 },
    },

    // ── Tools & Platforms ───────────────────────────────────────
    tools: {
      projectManagement: {
        type: String,
        enum: ["Jira", "Linear", "Notion", "Asana", "Trello", "Azure DevOps", "GitHub Projects", "ClickUp", "Other"],
      },
      communication: {
        type: String,
        enum: ["Slack", "Microsoft Teams", "Discord", "Google Chat", "Email", "Other"],
      },
      cicd: {
        type: String,
        enum: ["GitHub Actions", "GitLab CI", "Jenkins", "CircleCI", "Buildkite", "Azure Pipelines", "Other"],
      },
      monitoring: {
        type: String,
        enum: ["Datadog", "Grafana", "Sentry", "New Relic", "Elastic APM", "CloudWatch", "Prometheus", "Other"],
      },
    },

    // ── Extra ───────────────────────────────────────────────────
    notes: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast lookup by org + status
companySchema.index({ organization: 1, status: 1 });

export default mongoose.model("Company", companySchema);