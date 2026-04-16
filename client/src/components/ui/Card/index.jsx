import { cn } from "../../../utils/cn";

function Card({ children, className, hover = true }) {
  return (
    <div
      className={cn(
        "bg-[#1F2937] border border-[#2E3A4D] rounded-2xl p-5 shadow-sm",
        hover && "hover:shadow-md transition-all duration-200",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;