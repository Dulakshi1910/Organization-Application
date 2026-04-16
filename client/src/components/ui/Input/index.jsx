import { cn } from "../../../utils/cn";

function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full px-3 py-2 rounded-xl bg-[#1E293B] border border-[#334155] text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500",
        className
      )}
      {...props}
    />
  );
}

export default Input;