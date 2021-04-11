import basePayload from "./put.json";
// console.log(basePayload, "basePayload.json");

const API_URL = "/testiMIS/api/CsISPE_Event_Speakers";
export const get = async (id) => {
  const RequestVerificationToken = document.getElementById(
    "__RequestVerificationToken"
  )?.value;
  if (!RequestVerificationToken) {
    console.error("couldn't find request verification token");
    return;
  }

  try {
    await fetch(`${API_URL}/?id=${id}`, {
      //parameter is based on the order of the filters
      method: "GET",
      // data: JSON.stringify(data),
      headers: {
        RequestVerificationToken,
      },
      //suffficient auth for users
    });

    response = response.json();

    console.log("response from api", response);
  } catch (e) {
    console.error("encountered error during fetch/get", e);
  }
};

const generatePayloadFromFormData = (data) => {
  return Object.entries(data).map(([Name, Value]) => ({
    $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
    Name,
    Value,
  }));
};
//SEQN is unique ID
export const put = async (data) => {
  if (!data) {
    console.error("API-put did not receive data from form");
    return;
  }
  const payloadPropertyValues = generatePayloadFromFormData(data);
  //   console.log("generated payloadPropertyValues", payloadPropertyValues);
  const payload = { ...basePayload };
  payload.Properties.$values = payloadPropertyValues;

  console.log("final request payload", payload);

  const RequestVerificationToken = document.getElementById(
    "__RequestVerificationToken"
  )?.value;

  if (!RequestVerificationToken) {
    console.error("couldn't find request verification token");
    return;
  }
  try {
    await fetch(API_URL, {
      //parameter is based on the order of the filters
      method: "PUT",
      data: JSON.stringify(putJson),
      headers: {
        RequestVerificationToken,
      },
      //suffficient auth for users
    });

    response = response.json();

    console.log("response from api", response);
  } catch (e) {
    console.error("encountered error during fetch/put", e);
  }
};

export default { get, put };
