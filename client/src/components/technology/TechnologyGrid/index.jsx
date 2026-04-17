import TechnologyCard from "../TechnologyCard";

function TechnologyGrid({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-gray-400">No technologies found</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {data.map((item) => (
        <TechnologyCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default TechnologyGrid;