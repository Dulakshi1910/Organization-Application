import { orgsMock } from "../mocks/dashboardMock/orgsMock";

const STORAGE_KEY = "organizations";

//get
export const getOrganizations = async () => {
  const stored = localStorage.getItem(STORAGE_KEY);

  const data = stored ? JSON.parse(stored) : orgsMock;

  return Promise.resolve({
    data,
    meta: { total: data.length },
  });
};

//creat
export const createOrganization = async (data) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const existing = stored ? JSON.parse(stored) : orgsMock;

  const newOrg = {
    name: data.name,
    companies: 0,
    employees: 0,
    health: 75,
    status: "active", 
  };

  const updated = [newOrg, ...existing];

  // persist
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return Promise.resolve({
    data: newOrg,
  });
};