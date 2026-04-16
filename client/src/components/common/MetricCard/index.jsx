import Card from "../../ui/Card";

function MetricCard({ title, value, change, color, accent }) {
  return (
    <div className="relative">
      {/* Top gradient accent */}
      <div
        className={`absolute top-0 left-0 w-full h-[3px] rounded-t-2xl ${accent}`}
      />

      <Card className="pt-5 pb-5 px-5">
        <p className="text-sm text-slate-400 font-medium tracking-wide">
          {title}
        </p>

        <h2 className="text-3xl font-semibold text-slate-100 mt-2">
          {value}
        </h2>

        <p className={`text-sm mt-3 font-medium ${color}`}>
          {change}
        </p>
      </Card>
    </div>
  );
}

export default MetricCard;