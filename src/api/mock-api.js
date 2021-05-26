const API_URL = "/iMIS/api/CsISPE_Event_Speakers";

export const get = async (id, seqn) => {
  try {
    console.log("mock data get", { id, seqn });
    const fetchCall = `    fetch('${API_URL}/~${id}|${seqn}', {
      method: "GET",
      headers: {
        "RequestVerificationToken": document.getElementById("__RequestVerificationToken")?.value,
      },
    }).then(response=>response.json()).then(console.log);`;
    console.log(fetchCall);
    const data = await import(`./mockData/${id}-${seqn}.json`);
    console.log("returning data", data);
    return data;
  } catch (e) {
    console.error("encountered error during fetch/get", e);
    return {
      error: `Encountered error during GET for ${id}|${seqn}, check console for details.`,
    };
  }
};

export const put = async ({ data, id, seqn }) => {
  console.log("mock data put", data);
  // console.log("mock data put JSON", JSON.stringify(data));

  console.log(`${API_URL}/~${id}|${seqn}`, "*");

  // const payload = generatePutPayloadFromFormData(data);

  const fetchCall = `    fetch('${API_URL}/~${id}|${seqn}', {
      method: "PUT",
      data: '${JSON.stringify(data)}',
      headers: {
        "RequestVerificationToken": document.getElementById("__RequestVerificationToken")?.value,
        "Content-Type": "application/json"
      },
    }).then(response=>response.json()).then(console.log);`;
  console.log(fetchCall);
  await timeout(3000);
  return data;
};

export const del = async ({ id, seqn }) => {
  const API_URL = "/iMIS/api/CsISPE_Event_Speakers";

  console.log(`${API_URL}/~${id}|${seqn}`, "*");

  // const payload = generatePutPayloadFromFormData(data);

  const fetchCall = `    fetch('${API_URL}/~${id}|${seqn}', {
      method: "DEL",
      headers: {
        "RequestVerificationToken": document.getElementById("__RequestVerificationToken")?.value
      },
    }).then(response=>response.json()).then(console.log);`;
  console.log(fetchCall);
  await timeout(3000);
  return true;
};

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default { get, put, del };
