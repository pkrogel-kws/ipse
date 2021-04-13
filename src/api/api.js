// console.log(basePayload, "basePayload.json");

const API_URL = "/iMIS/api/CsISPE_Event_Speakers";
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

//SEQN is unique ID
export const put = async ({ data, id, seqn }) => {
  if (!data) {
    console.error("API-put did not receive data from form");
    return;
  }

  const payload = generatePutPayloadFromFormData(data);

  console.log("final request payload", payload);

  const RequestVerificationToken = document.getElementById(
    "__RequestVerificationToken"
  )?.value;

  if (!RequestVerificationToken) {
    console.error("couldn't find request verification token");
    return;
  }

  try {
    await fetch(`${API_URL}/~${id}|${seqn}`, {
      //parameter is based on the order of the filters
      method: "PUT",
      data: JSON.stringify(payload),
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

const generatePutPayloadFromFormData = (data) => {
  const values = Object.entries(data).map(([Name, Value]) => {
    if (Value === "true" || Value === "false") {
      Value = { $type: "System.Boolean", $value: Value };
    }
    return {
      $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
      Name,
      Value,
    };
  });

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
