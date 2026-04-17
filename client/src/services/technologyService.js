import technologyMock from "../mocks/dashboardMock/technologyMock";

export const getTechnologies = async () => {
  try {
    //  replace with API call
    return Promise.resolve(technologyMock);
  } catch (error) {
    throw error;
  }
};