import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"; 

import { getOrganizations } from "../../services/organizationService";
import OrganizationGrid from "../../components/organizations/OrganizationGrid";
import OrganizationFilters from "../../components/organizations/OrganizationFilters";

export default function Organizations() {
  const navigate = useNavigate(); 

  const [organizations, setOrganizations] = useState([]);
  const [meta, setMeta] = useState({
    loading: false,
    error: null,
  });

  const [query, setQuery] = useState({
    status: "all",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMeta({ loading: true, error: null });

        const res = await getOrganizations();
        setOrganizations(Array.isArray(res?.data) ? res.data : []);
      } catch (err) {
        setMeta({ loading: false, error: "Failed to load organizations" });
      } finally {
        setMeta((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    if (!Array.isArray(organizations)) return [];

    if (query.status === "all") return organizations;

    return organizations.filter(
      (org) => org?.status === query.status
    );
  }, [organizations, query.status]);

  if (meta.loading) {
    return <div className="text-gray-400 text-sm">Loading organizations...</div>;
  }

  if (meta.error) {
    return <div className="text-red-400 text-sm">{meta.error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-white text-lg font-semibold">
          Organizations
        </h2>

        
        <button
          onClick={() => navigate("/organizations/create")}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-sm text-white transition"
        >
          + Add Organization
        </button>
      </div>

      <OrganizationFilters query={query} setQuery={setQuery} />

      <OrganizationGrid data={filteredData} />
    </div>
  );
}