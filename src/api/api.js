// console.log(basePayload, "basePayload.json");

const API_URL = "/iMIS/api/CsISPE_Event_Speakers";
export const get = async (id, seqn) => {
  try {
    const RequestVerificationToken = document.getElementById(
      "__RequestVerificationToken"
    )?.value;
    if (!RequestVerificationToken) {
      throw "couldn't find __RequestVerificationToken";
      return;
    }
    let response = await fetch(`${API_URL}/~${id}|${seqn}`, {
      //parameter is based on the order of the filters
      method: "GET",
      // data: JSON.stringify(data),
      headers: {
        RequestVerificationToken,
      },
      //suffficient auth for users
    });

    response = await response.json();

    console.log("response from api", response);
    return response;
  } catch (e) {
    console.error("encountered error during fetch/get", e);
    return {
      error: `Encountered error during GET for ${id}|${seqn}, check console for details.`,
    };
  }
};

//SEQN is unique ID
export const put = async ({ data, id, seqn }) => {
  try {
    const RequestVerificationToken = document.getElementById(
      "__RequestVerificationToken"
    )?.value;
    if (!RequestVerificationToken) {
      throw "couldn't find __RequestVerificationToken";
      return;
    }

    let response = await fetch(`${API_URL}/~${id}|${seqn}`, {
      //parameter is based on the order of the filters
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        RequestVerificationToken,
        "Content-Type": "application/json",
      },
      //suffficient auth for users
    });

    response = await response.json();

    console.log("response from put api", response);
    return response;
  } catch (e) {
    console.error("encountered error during fetch/put", e);
    return {
      error: `Encountered error during PUT for ${id}|${seqn}, check console for details.`,
    };
  }
};

//SEQN is unique ID
export const del = async ({ id, seqn }) => {
  try {
    const RequestVerificationToken = document.getElementById(
      "__RequestVerificationToken"
    )?.value;
    if (!RequestVerificationToken) {
      throw "couldn't find __RequestVerificationToken";
      return;
    }

    let response = await fetch(`${API_URL}/~${id}|${seqn}`, {
      //parameter is based on the order of the filters
      method: "DELETE",
      headers: {
        RequestVerificationToken,
        // "Content-Type": "application/json",
      },
      //suffficient auth for users
    });

    response = await response.json();

    console.log("response from put api", response);
    return response;
  } catch (e) {
    console.error("encountered error during fetch/del", e);
    return {
      error: `Encountered error during DELETE for ${id}|${seqn}, check console for details.`,
    };
  }
};

// const generatePutPayloadFromFormData = (data) => {
//   const values = Object.entries(data).map(([Name, Value]) => {
//     if (Value === "true" || Value === "false") {
//       Value = { $type: "System.Boolean", $value: Value };
//     }
//     return {
//       $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
//       Name,
//       Value,
//     };
//   });

//   return {
//     $type: "Asi.Soa.Core.DataContracts.GenericEntityData, Asi.Contracts",
//     EntityTypeName: "CsISPE_Event_Speakers",
//     PrimaryParentEntityTypeName: "Party",
//     Identity: {
//       $type: "Asi.Soa.Core.DataContracts.IdentityData, Asi.Contracts",
//       EntityTypeName: "CsISPE_Event_Speakers",
//       IdentityElements: {
//         $type:
//           "System.Collections.ObjectModel.Collection`1[[System.String, mscorlib]], mscorlib",
//         $values: [data.ID, data.SEQN],
//       },
//     },
//     PrimaryParentIdentity: {
//       $type: "Asi.Soa.Core.DataContracts.IdentityData, Asi.Contracts",
//       EntityTypeName: "Party",
//       IdentityElements: {
//         $type:
//           "System.Collections.ObjectModel.Collection`1[[System.String, mscorlib]], mscorlib",
//         $values: [data.ID],
//       },
//     },
//     Properties: {
//       $type:
//         "Asi.Soa.Core.DataContracts.GenericPropertyDataCollection, Asi.Contracts",
//       $values: values,
//     },
//   };
// };

export default { get, put, del };
