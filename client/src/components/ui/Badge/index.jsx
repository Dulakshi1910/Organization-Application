function Badge({ label, variant = "default" }) {
  const styles = {
    default: "bg-slate-700 text-slate-300",
    success: "bg-green-500/20 text-green-400",
    warning: "bg-yellow-500/20 text-yellow-400",
    danger: "bg-red-500/20 text-red-400",
  };

  return (
    <span className={`px-2 py-1 text-xs rounded-full ${styles[variant]}`}>
      {label}
    </span>
  );
}

export default Badge;