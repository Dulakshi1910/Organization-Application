import { cn } from "../../../utils/cn";

function Button({ children, className, variant = "primary", ...props }) {
  const base = "px-4 py-2 rounded-xl text-sm font-medium transition";

  const variants = {
    primary: "bg-indigo-500 hover:bg-indigo-600 text-white",
    secondary: "bg-slate-700 hover:bg-slate-600 text-white",
    ghost: "text-slate-300 hover:bg-slate-700",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

export default Button;