import { useEffect, useMemo, useState } from "react";
import TechnologyFilters from "../../components/technology/TechnologyFilters";
import TechnologyStats from "../../components/technology/TechnologyStats";
import TechnologyGrid from "../../components/technology/TechnologyGrid";
import { getTechnologies } from "../../services/technologyService";

function TechnologyPage() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getTechnologies();
        const arr = Array.isArray(res) ? res : [];
        setData(arr);

        // derive category list from backend data (unique, preserve order)
        const cats = Array.from(new Set(arr.map((i) => i.category).filter(Boolean)));
        setCategories(cats);
      } catch (error) {
        console.error("Failed to load technologies", error);
        setData([]); // safe fallback
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    if (category === "All") return data;

    return data.filter((item) => item?.category === category);
  }, [data, category]);

  
  if (loading) {
    return <p className="text-gray-400">Loading technologies...</p>;
  }

  return (
    <div className="space-y-6">
      <TechnologyFilters category={category} setCategory={setCategory} categories={categories} />
      <TechnologyStats data={filteredData} />
      <TechnologyGrid data={filteredData} />
    </div>
  );
}

export default TechnologyPage;