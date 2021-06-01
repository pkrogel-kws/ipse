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

  const url = `${API_URL}/~${id}|${seqn}`;

  // const payload = generatePutPayloadFromFormData(data);

  const fetchCall = `fetch('${url}', {
      method: "PUT",
      body: '${JSON.stringify(data)}',
      headers: {
        "RequestVerificationToken": document.getElementById("__RequestVerificationToken")?.value,
        "Content-Type": "application/json"
      },
    }).then(response=>response.json()).then(console.log);`;
  console.log(fetchCall);

  await timeout(3000);

  return data;
};

export const post = async ({ data }) => {
  console.log("mock data put", data);
  // console.log("mock data put JSON", JSON.stringify(data));

  // const payload = generatePutPayloadFromFormData(data);

  const fetchCall = `fetch('${API_URL}', {
      method: "POST",
      body: '${JSON.stringify(data)}',
      headers: {
        "RequestVerificationToken": document.getElementById("__RequestVerificationToken")?.value,
        "Content-Type": "application/json"
      },
    }).then(response=>response.json()).then(console.log);`;
  console.log(fetchCall);

  await timeout(3000);

  const fakeId = uuid(8);
  const fakeSqn = uuid(5);
  data.Identity.IdentityElements = {
    $type:
      "System.Collections.ObjectModel.Collection`1[[System.String, mscorlib]], mscorlib",
    $values: [fakeId, fakeSqn],
  };
  data.PrimaryParentIdentity.IdentityElements = {
    $type:
      "System.Collections.ObjectModel.Collection`1[[System.String, mscorlib]], mscorlib",
    $values: [fakeId],
  };
  data.Properties.$values.forEach((prop, idx) => {
    if (prop.Name === "ID") {
      data.Properties.$values[idx].Value = fakeId;
    }
    if (prop.Name === "SEQN") {
      data.Properties.$values[idx].Value = fakeSqn;
    }
  });
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

const uuid = (length) => {
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
};

export default { get, post, put, del };
