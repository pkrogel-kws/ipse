import prodApi from "./api";
import mockApi from "./mock-api";

export const getApi = () => {
  if (!!import.meta.env.DEV) {
    return mockApi;
  }
  return prodApi;
};

const api = getApi();

export default prodApi;
