import OrganizationCard from "../OrganizationCard";

export default function OrganizationGrid({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm py-12">
        No organizations found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {data.map((org, index) => (
        <OrganizationCard
          key={org.id || org.name || index}
          org={org}
        />
      ))}
    </div>
  );
}