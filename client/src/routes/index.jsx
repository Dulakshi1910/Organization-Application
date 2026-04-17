import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Companies from "../pages/Companies";
import CreateCompany from "../pages/Companies/CreateCompany";
import Organizations from "../pages/Organizations";
import CreateOrganizationPage from "../pages/Organizations/create/index";

import DashboardLayout from "../components/layout/DashboardLayout";
import CompanyDetail from "../pages/Companies/CompanyDetail";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />

        {/* Companies */}
        <Route
          path="/companies"
          element={
            <DashboardLayout>
              <Companies />
            </DashboardLayout>
          }
        />

       
        <Route
          path="/companies/create"
          element={
            <DashboardLayout>
              <CreateCompany />
            </DashboardLayout>
          }
        />

        {/* Organizations */}
        <Route
          path="/organizations"
          element={
            <DashboardLayout>
              <Organizations />
            </DashboardLayout>
          }
        />

        {/* Create Organization */}
        <Route
          path="/organizations/create"
          element={
            <DashboardLayout>
              <CreateOrganizationPage />
            </DashboardLayout>
          }
        />

        <Route path="/" element={<Dashboard />} />

        <Route path="/companies" element={<Companies />} />

        
        <Route path="/companies/create" element={<CreateCompany />} />
        <Route path="/companies/:companyId" element={<CompanyDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;