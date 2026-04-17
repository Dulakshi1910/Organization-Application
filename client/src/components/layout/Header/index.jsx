import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const getPageInfo = () => {
    const path = location.pathname;

    // Ddashbard
    if (path === "/") {
      return {
        title: "Dashboard",
        subtitle: "Overview",
      };
    }

    // organization
    if (path.startsWith("/organizations")) {
      if (path.includes("create")) {
        return {
          title: "Organizations",
          subtitle: "Create Organization",
        };
      }

      return {
        title: "Organizations",
        subtitle: "Manage organizations",
      };
    }

    // compaies
    if (path.startsWith("/companies")) {
      if (path.includes("create")) {
        return {
          title: "Companies",
          subtitle: "Create Company",
        };
      }

      return {
        title: "Companies",
        subtitle: "Manage companies",
      };
    }

    // tech
    if (path.startsWith("/tech-radar")) {
      return {
        title: "Tech Radar",
        subtitle: "Technology insights",
      };
    }

    // architecture
    if (path.startsWith("/architecture-map")) {
      return {
        title: "Architecture Map",
        subtitle: "System overview",
      };
    }

    // default
    return {
      title: "Dashboard",
      subtitle: "Overview",
    };
  };

  const { title, subtitle } = getPageInfo();

  return (
    <div className="w-full border-b border-[#1F2937] pb-4 mb-6">
      <h1 className="text-xl font-semibold text-white">{title}</h1>
      <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
  );
}

export default Header;