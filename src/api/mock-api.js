export const get = async (id) => {
  console.log("mock data get", id);
  const data = await import(`./mockData/${id}.json`);
  console.log("returning data", data);
  return data;
};

export const put = async ({ data, id, seqn }) => {
  console.log("mock data put", data);
  console.log("mock data put JSON", JSON.stringify(data));

  const API_URL = "/iMIS/api/CsISPE_Event_Speakers";

  console.log(`${API_URL}/~${id}|${seqn}`, "*");

  // const payload = generatePutPayloadFromFormData(data);

  const fetchCall = `    fetch('${API_URL}/~${id}|${seqn}', {
      method: "PUT",
      data: '${JSON.stringify(data)}',
      headers: {
        "RequestVerificationToken": document.getElementById("__RequestVerificationToken")?.value
      },
    }).then(response=>response.json()).then(console.log);`;
  console.log(fetchCall);
  await timeout(3000);
};

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const generatePutPayloadFromFormData = (data) => {
  const values = Object.entries(data).map(([Name, Value]) => ({
    $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
    Name,
    Value,
  }));

  return {
    $type: "Asi.Soa.Core.DataContracts.GenericEntityData, Asi.Contracts",
    EntityTypeName: "CsISPE_Event_Speakers",
    PrimaryParentEntityTypeName: "Party",
    Identity: {
      $type: "Asi.Soa.Core.DataContracts.IdentityData, Asi.Contracts",
      EntityTypeName: "CsISPE_Event_Speakers",
      IdentityElements: {
        $type:
          "System.Collections.ObjectModel.Collection`1[[System.String, mscorlib]], mscorlib",
        $values: [data.ID, data.SEQN],
      },
    },
    PrimaryParentIdentity: {
      $type: "Asi.Soa.Core.DataContracts.IdentityData, Asi.Contracts",
      EntityTypeName: "Party",
      IdentityElements: {
        $type:
          "System.Collections.ObjectModel.Collection`1[[System.String, mscorlib]], mscorlib",
        $values: [data.ID],
      },
    },
    Properties: {
      $type:
        "Asi.Soa.Core.DataContracts.GenericPropertyDataCollection, Asi.Contracts",
      $values: values,
    },
  };
};

export default { get, put };
