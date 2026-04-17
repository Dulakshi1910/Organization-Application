import Card from "../../ui/Card";
import TechChip from "../../ui/TechChip";

function CompanyCard({ company }) {
  if (!company) return null;

  return (
    <Card>
      <div className="flex justify-between items-center">
        <h3 className="text-white font-medium">{company.name}</h3>
        {company.score !== undefined && company.score !== null && (
          <span className="text-xs text-green-400">Score {company.score}</span>
        )}
      </div>

      <p className="text-sm text-gray-400 mt-1">{company.description}</p>

      <div className="flex gap-2 mt-3 flex-wrap">
        {Array.isArray(company.tech) &&
          company.tech.map((t) => <TechChip key={t} label={t} />)}
      </div>

      <p className="text-xs text-gray-400 mt-3">
        {company.employees} employees
      </p>
    </Card>
  );
}

export default CompanyCard;