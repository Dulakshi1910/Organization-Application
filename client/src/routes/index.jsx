import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Companies from "../pages/Companies";
import CreateCompany from "../pages/Companies/CreateCompany";
import Organizations from "../pages/Organizations";
import CreateOrganizationPage from "../pages/Organizations/create/index";
import Technology from "../pages/Technology"; // ✅ added

import DashboardLayout from "../components/layout/DashboardLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />

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

        <Route
          path="/organizations"
          element={
            <DashboardLayout>
              <Organizations />
            </DashboardLayout>
          }
        />

        <Route
          path="/organizations/create"
          element={
            <DashboardLayout>
              <CreateOrganizationPage />
            </DashboardLayout>
          }
        />

        {/* ✅ NEW ROUTE */}
        <Route
          path="/tech-radar"
          element={
            <DashboardLayout>
              <Technology />
            </DashboardLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;