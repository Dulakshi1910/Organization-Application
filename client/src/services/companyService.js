// Company service using backend API

// GET companies for an organization
export const getCompanies = async (orgId) => {
  if (!orgId) return [];
  try {
    const res = await fetch(`/api/organizations/${orgId}/companies`);
    if (!res.ok) return [];
    const json = await res.json();
    const companies = Array.isArray(json.data) ? json.data : [];

    // Fetch orgs to map organization id -> name
    const orgsRes = await fetch('/api/organizations');
    const orgsJson = orgsRes.ok ? await orgsRes.json() : { data: [] };
    const orgs = Array.isArray(orgsJson.data) ? orgsJson.data : [];
    const orgMap = orgs.reduce((acc, o) => {
      acc[o._id || o.id] = o.name || o.slug || "";
      return acc;
    }, {});

    // Normalize company shape for the UI
    const normalized = companies.map((c) => ({
      id: c._id || c.id,
      name: c.name,
      description: c.description,
      organization: c.organization, // keep id
      org: orgMap[c.organization] || (c.organization && c.organization.name) || "",
      employees: c.employees || 0,
      tech: c.techStack
        ? {
            frontend: c.techStack.frontend || [],
            backend: c.techStack.backend || [],
            database: c.techStack.database || [],
            devops: c.techStack.devops || [],
            cloud: c.techStack.cloud || "",
          }
        : c.tech || {},
      status: c.status,
      founded: c.foundedYear || c.founded || "-",
      updated: c.updatedAt ? new Date(c.updatedAt).toLocaleDateString() : c.updated || "",
      raw: c,
    }));

    return normalized;
  } catch {
    return [];
  }
};

export const getCompanyById = async (companyId) => {
  if (!companyId) return null;
  try {
    const res = await fetch(`/api/companies/${companyId}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch {
    return null;
  }
};

// Create a company under an organization. If orgId isn't provided, attempt to
// infer it from `payload.org` (name/slug) or fall back to the first org.
export const createCompany = async (orgIdOrPayload, payload) => {
  // Support both createCompany(payload) and createCompany(orgId, payload)
  let orgId = null;
  let body = payload;
  if (payload === undefined) {
    body = orgIdOrPayload;
  } else {
    orgId = orgIdOrPayload;
  }

  if (!body) return { success: false };

  try {
    let targetOrgId = orgId;

    if (!targetOrgId) {
      const orgsRes = await fetch('/api/organizations');
      const orgsJson = orgsRes.ok ? await orgsRes.json() : { data: [] };
      const orgs = Array.isArray(orgsJson.data) ? orgsJson.data : [];

      if (body.org) {
        const matched = orgs.find((o) => o.name === body.org || o.slug === body.org);
        targetOrgId = matched?._id || matched?.id || null;
      }

      if (!targetOrgId && orgs.length) targetOrgId = orgs[0]._id || orgs[0].id;
    }

    if (!targetOrgId) return { success: false, error: 'No organization available' };

    const res = await fetch(`/api/organizations/${targetOrgId}/companies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { success: false, error: err };
    }

    const json = await res.json();
    return { success: true, data: json.data };
  } catch (e) {
    return { success: false, error: e };
  }
};