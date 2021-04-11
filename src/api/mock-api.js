export const get = async (id) => {
  console.log("mock data get", id);
  const data = await import(`./mockData/${id}.json`);
  console.log("returning data", data);
  return data;
};

export const put = async (data) => {
  console.log("mock data put", data);
  console.log("mock data put JSON", JSON.stringify(data));
  await timeout(3000);
};

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default { get, put };
