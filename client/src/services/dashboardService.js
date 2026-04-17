import { getOrganizations } from "./organizationService";

const safe = (obj, ...paths) => {
  for (const p of paths) {
    const parts = p.split(".");
    let cur = obj;
    for (const part of parts) {
      if (!cur) break;
      cur = cur[part];
    }
    if (cur !== undefined) return cur;
  }
  return undefined;
};

const toMetric = (title, value, change = "", extra = {}) => ({
  title,
  value,
  change,
  color: extra.color || "text-emerald-400",
  accent: extra.accent || "bg-gradient-to-r from-indigo-500 to-purple-500",
});

export const getDashboardData = async (orgId) => {
  try {
    // determine orgId if not provided
    let selectedOrgId = orgId;
    if (!selectedOrgId) {
      const orgsRes = await getOrganizations();
      const orgs = Array.isArray(orgsRes.data) ? orgsRes.data : [];
      // Prefer an organization that already has companies, otherwise use the first
      const orgWithCompanies = orgs.find((o) => (o.companyCount || o.companies || 0) > 0);
      if (orgWithCompanies) {
        selectedOrgId = orgWithCompanies._id || orgWithCompanies.id;
      } else if (orgs.length > 0) {
        selectedOrgId = orgs[0]._id || orgs[0].id;
      }
    }

    if (!selectedOrgId) {
      return {
        metrics: [],
        companies: [],
        orgs: [],
        activity: [],
      };
    }

    const res = await fetch(`/api/organizations/${selectedOrgId}/dashboard`);
    if (!res.ok) throw new Error("Failed fetching dashboard");

    const json = await res.json();
    const payload = json.data || json || {};

    const summary = safe(payload, "summary", "data.summary") || {};

    const totalCompanies = safe(summary, "totalCompanies", "total_companies") ?? 0;
    const totalEmployees = safe(summary, "totalEmployees", "total_employees") ?? 0;
    const activeCompanies = safe(summary, "activeCompanies", "active_companies") ?? 0;

    const topTech = safe(payload, "topTechnologies", "top_technologies") || {};
    const frontendTech = Array.isArray(topTech.frontend) ? topTech.frontend : [];
    const backendTech = Array.isArray(topTech.backend) ? topTech.backend : [];

    const metrics = [
      toMetric("Total Companies", totalCompanies, ""),
      toMetric("Total Employees", totalEmployees, ""),
      toMetric("Active Companies", activeCompanies, ""),
      toMetric("Organizations", 0, ""),
    ];

    // Map recent companies to the shape CompanyCard expects
    const recent = safe(payload, "recentCompanies", "recent_companies") || [];
    const companies = Array.isArray(recent)
      ? recent.map((c, i) => ({
          id: c._id || c.id || i,
          name: c.name || c.companyName || "Untitled",
          description: c.description || c.desc || "",
          employees: c.employees ?? 0,
          tech: Array.isArray(c.techStack?.frontend)
            ? [...c.techStack.frontend, ...(Array.isArray(c.techStack.backend) ? c.techStack.backend : [])]
            : Array.isArray(c.frontend) || Array.isArray(c.backend)
            ? [...(c.frontend || []), ...(c.backend || [])]
            : c.tech || [],
          score:
            c.score ??
            (c.engineeringHealth
              ? Math.round(
                  ((c.engineeringHealth.testCoverage || 0) +
                    (c.engineeringHealth.uptime || 0) +
                    (100 - (c.engineeringHealth.techDebt || 0))) /
                    3
                )
              : undefined),
        }))
      : [];

    // use orgs endpoint for org list (fallback to payload.organization)
    const orgsRes2 = await getOrganizations();
    const orgs = Array.isArray(orgsRes2.data) && orgsRes2.data.length > 0
      ? orgsRes2.data
      : (payload.organization ? [payload.organization] : []);

    // update organizations metric with actual count
    const orgCount = Array.isArray(orgs) ? orgs.length : 0;
    metrics[3].value = orgCount;

    // synthesize activity from recent companies if available
    const activity = Array.isArray(recent)
      ? recent.slice(0, 10).map((c) => ({ text: `${c.name || c.companyName || 'Company'} updated profile`, time: c.updatedAt ? new Date(c.updatedAt).toLocaleString() : 'recent' }))
      : [];

    return {
      metrics,
      companies,
      orgs,
      activity,
      raw: payload,
    };
  } catch (error) {
    return {
      metrics: [],
      companies: [],
      orgs: [],
      activity: [],
    };
  }
};