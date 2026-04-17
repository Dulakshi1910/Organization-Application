import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Companies from "../pages/Companies";
import CreateCompany from "../pages/Companies/CreateCompany";
import CompanyDetail from "../pages/Companies/CompanyDetail";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/companies" element={<Companies />} />

        
        <Route path="/companies/create" element={<CreateCompany />} />
        <Route path="/companies/:companyId" element={<CompanyDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;