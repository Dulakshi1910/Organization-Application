export const getTechnologies = async (orgId) => {
  try {
    const url = orgId ? `/api/technologies?orgId=${orgId}` : '/api/technologies';
    const res = await fetch(url);
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error('Failed to fetch technologies', error);
    return [];
  }
};