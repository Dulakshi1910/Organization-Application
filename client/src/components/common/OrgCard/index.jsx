import Card from "../../ui/Card";
import ProgressBar from "../../ui/ProgressBar";
import Badge from "../../ui/Badge";

function OrgCard({ org }) {
  if (!org) return null;

  return (
    <Card>
      <div className="flex justify-between">
        <h3 className="text-white font-medium">{org.name}</h3>
        <Badge label={org.status} variant="success" />
      </div>

      <p className="text-sm text-gray-400 mt-1">
        {org.companies} companies
      </p>

      <div className="mt-3">
        <ProgressBar value={org.health} />
      </div>
    </Card>
  );
}

export default OrgCard;