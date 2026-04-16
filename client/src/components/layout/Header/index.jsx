import Input from "../../ui/Input";
import Button from "../../ui/Button";

function Header() {
  return (
    <div className="flex items-center justify-between border-b border-[#1F2937] pb-4 mb-6">
      <div>
        <h2 className="text-white text-xl font-semibold">Dashboard</h2>
        <p className="text-gray-400 text-sm">Overview</p>
      </div>

      <div className="flex items-center gap-3">
        <Input placeholder="Search..." />
        <Button variant="secondary">Filter</Button>
        <Button>Add Company</Button>
      </div>
    </div>
  );
}

export default Header;