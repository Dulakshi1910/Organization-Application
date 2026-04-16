import { metricsMock } from "../mocks/dashboardMock/metricsMock";
import { companiesMock } from "../mocks/dashboardMock/companiesMock";
import { orgsMock } from "../mocks/dashboardMock/orgsMock";
import { activityMock } from "../mocks/dashboardMock/activityMock";

export const getDashboardData = async () => {
  try {
    return {
      metrics: Array.isArray(metricsMock) ? metricsMock : [],
      companies: Array.isArray(companiesMock) ? companiesMock : [],
      orgs: Array.isArray(orgsMock) ? orgsMock : [],
      activity: Array.isArray(activityMock) ? activityMock : [],
    };
  } catch (error) {
    return {
      metrics: [],
      companies: [],
      orgs: [],
      activity: [],
    };
  }
};