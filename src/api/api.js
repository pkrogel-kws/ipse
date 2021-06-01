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

    if (response.IsValid === false) {
      console.error("PUT ERROR: ", response.ValidationResults);
      throw "Error occured in PUT. Check console for details.";
    }

    console.log("response from put api", response);
    return response;
  } catch (e) {
    console.error("encountered error during fetch/put", e);
    return {
      error: `Encountered error during PUT for ${id}|${seqn}, check console for details.`,
    };
  }
};

export const post = async ({ data }) => {
  try {
    const RequestVerificationToken = document.getElementById(
      "__RequestVerificationToken"
    )?.value;
    if (!RequestVerificationToken) {
      throw "couldn't find __RequestVerificationToken";
      return;
    }

    let response = await fetch(API_URL, {
      //parameter is based on the order of the filters
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        RequestVerificationToken,
        "Content-Type": "application/json",
      },
      //suffficient auth for users
    });

    response = await response.json();

    if (response.IsValid === false) {
      console.error("POST ERROR: ", response.ValidationResults);
      throw "Error occured in POST. Check console for details.";
    }

    console.log("response from put api", response);
    return response;
  } catch (e) {
    console.error("encountered error during fetch/post", e);
    return {
      error: `Encountered error during POST, check console for details.`,
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

export default { get, post, put, del };
