// get organizations from backend
export const getOrganizations = async () => {
  try {
    const res = await fetch('/api/organizations');
    if (!res.ok) return { data: [], meta: { total: 0 } };
    const json = await res.json();
    const raw = Array.isArray(json.data) ? json.data : [];
    const data = raw.map((o) => ({
      _id: o._id || o.id,
      id: o._id || o.id,
      name: o.name,
      slug: o.slug,
      description: o.description,
      companies: o.companyCount ?? o.companies ?? 0,
      employees: o.employees ?? 0,
      health: o.health ?? 75,
      status: o.status ?? (o.isActive ? 'active' : 'inactive'),
      tags: o.tags || [],
      logoUrl: o.logoUrl || o.logo || null,
      companiesPreview: Array.isArray(o.companiesPreview)
        ? o.companiesPreview.map((c) => ({ id: c.id || c._id, name: c.name }))
        : [],
    }));

    return { data, meta: { total: data.length } };
  } catch (e) {
    return { data: [], meta: { total: 0 } };
  }
};

// create organization via backend
export const createOrganization = async (data) => {
  try {
    const res = await fetch('/api/organizations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
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