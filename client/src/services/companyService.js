import { companiesMock } from "../mocks/dashboardMock/companiesMock";

const STORAGE_KEY = "companies_data";

// GET
export const getCompanies = async () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      return JSON.parse(stored);
    }

    // first load
    localStorage.setItem(STORAGE_KEY, JSON.stringify(companiesMock));
    return companiesMock;
  } catch {
    return [];
  }
};

// CREATE
export const createCompany = async (payload) => {
  try {
    if (!payload) return { success: false };

    const existing =
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const newCompany = {
      ...payload,
      id: Date.now(),
      updated: "just now",
      score: payload.score || 80,
      org: payload.org || "New Org",
      tech: payload.tech || [],
    };

    const updated = [newCompany, ...existing];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return { success: true, data: newCompany };
  } catch {
    return { success: false };
  }
};