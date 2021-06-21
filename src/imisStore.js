import { writable, readable } from "svelte/store";
import { getApi } from "./api";
import emptyContractObject from "./api/empty_object";

const api = getApi();

const createStore = async (id, seqn) => {
  let response;
  if (seqn) {
    response = await api.get(id, seqn);
  } else {
    response = { ...emptyContractObject };
  }

  console.log("creating imis store for ", { id, seqn });
  // let response = await api.get(id, seqn);

  const { subscribe, set, update } = writable({
    loading: false,
    response,
    data: response.error ? {} : extractValuesFromResponse(response),
    error: response.error || false,
  });

  const put = async (formData) => {
    update((data) => {
      delete data?.error;
      data.loading = true;
      return data;
    });
    let payload = patchPayload(response, formData);

    payload = replaceEmptyValuesInPayload(payload);
    // payload = removeFieldFromPayload("Date_Modified", payload);
    payload = removeFieldFromPayload("TIME_STAMP", payload);

    console.log("repaired payload (final) ", payload);

    response = await api.put({ data: payload, seqn, id });
    console.log("server responded with", response);
    //TODO:handle errors here
    set({
      loading: false,
      response,
      data: response.error ? {} : extractValuesFromResponse(response),
      error: response.error || false,
    });
  };

  const post = async (formData) => {
    update((data) => {
      delete data?.error;
      data.loading = true;
      return data;
    });
    let payload = patchPayload(response, formData);
    payload = replaceEmptyValuesInPayload(payload);
    payload = removeFieldFromPayload("Date_Modified", payload);
    payload = removeFieldFromPayload("Removed_Date", payload);
    // payload = removeFieldFromPayload("TIME_STAMP", payload);
    // payload = removeFieldFromPayload("UD_1", payload);
    // payload = removeFieldFromPayload("UD_2", payload);

    delete payload.PrimaryParentIdentity.IdentityElements;
    delete payload.Identity.IdentityElements;

    console.log("repaired payload (final:) ", payload);

    response = await api.post({ data: payload });
    console.log("server responded with: ", response);
    //TODO:handle errors here
    set({
      loading: false,
      response,
      data: response.error ? {} : extractValuesFromResponse(response),
      error: response.error || false,
    });
  };

  const del = async (formData) => {
    update((data) => {
      delete data?.error;
      data.loading = true;
      return data;
    });
    let response = await api.del({ seqn, id });
    set({
      loading: false,
      response,
      data: {},
      error: response.error || false,
    });
    //TODO: close modal
  };

  const clear = () => {
    set({
      ID: "",
      Event_Code: "",
      Function_Code: "",
      Function_Start_Date: null,
      Function_End_Date: null,
      PPT_NO_SHOW: null,
      Role: null,
      Presentation_Title: null,
      Presentation_Desc: null,
      Track: null,
    });
  };
  return { subscribe, del, post, put, clear };
};

const extractValuesFromResponse = (response) => {
  console.log(response, "response");
  const retVal = {};
  response.Properties.$values.forEach(({ Name, Value }) => {
    if (typeof Value === "object" && Value != null) {
      // console.log(Name, "retVal[Name]");
      retVal[Name] = Value.$value;
    } else {
      //string
      retVal[Name] = Value;
    }
  });
  return retVal;
};

const patchPayload = (payload, values) => {
  payload.Properties.$values.forEach(({ Name, Value }, idx) => {
    const newVal = values[Name];

    if (!newVal) {
      return;
    }
    // console.log(`patching `, { Name, Value, idx, newVal });
    if (Value?.$value !== undefined) {
      payload.Properties.$values[idx] = { ...Value, $value: newVal };
      return;
    }

    payload.Properties.$values[idx].Value = newVal;
  });
  return payload;
};

const propertiesToCheck = [
  // "Abstract",
  // "Assistant_Info",
  // "File_Location",
  // "Function_Code",
  // "Recording",
  "UC_1",
  "UC_2",
];
const replaceEmptyValuesInPayload = (payload) => {
  payload.Properties.$values.forEach(({ Name, Value }, idx) => {
    if (propertiesToCheck.includes(Name)) {
      // if (Value.$value !== undefined && Value.$value === "") {
      //   console.log(`repairing `, { Name, Value, idx });

      //   payload.Properties.$values[idx].$value = { ...Value, $value: "TEST" };
      //   //we need to pick replacement value based on field type
      //   return;
      // }
      if (Value === "" || Value === null) {
        console.log(`repairing `, { Name, Value, idx });

        payload.Properties.$values[idx].Value = "TEST";
        return;
      }
    }
  });
  return payload;
};

const removeFieldFromPayload = (fieldName, payload) => {
  payload.Properties.$values.forEach(({ Name, Value }, idx) => {
    if (Name === fieldName) {
      console.log(`removing `, { Name, Value, idx });
      payload.Properties.$values.splice(idx, 1);
      return;
    }
  });
  //need to fix up indexes
  return payload;
};

// const generatePayloadFromFormData = (formData, ) => {
//   return Object.entries(formData).map(([Name, Value]) => ({
//     $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
//     Name,
//     Value,
//   }));
// };

export default createStore;

// export default function (id) {
//   // create the underlying store

//    console.log("creating imis store for " + id);
//   const response = await api.get(id);
//   const initial = response.Items.$values[0];
//   console.log("currentData", initial);
//   const store = writable(initial);

//   // define a request function that will do `fetch` and update store when request fini shes
//   store.request = async (method, url, params = null) => {
//     // before we fetch, clear out previous errors and set `loading` to `true`
//     store.update((data) => {
//       delete data.errors;
//       data.loading = true;

//       return data;
//     });

//     // define headers and body
//     const headers = {
//       "Content-type": "application/json",
//     };
//     const body = params ? JSON.stringify(params) : undefined;

//     // execute fetch
//     const response = await fetch(url, { method, body, headers });
//     // pull out json body
//     const json = await response.json();

//     // if response is 2xx
//     if (response.ok) {
//       // update the store, which will cause subscribers to be notified
//       store.set(json);
//     } else {
//       // response failed, set `errors` and clear `loading` flag
//       store.update((data) => {
//         data.loading = false;
//         data.errors = json.errors;
//         return data;
//       });
//     }
//   };

//   // convenience wrappers for get, post, patch, and delete
//   store.get = (url) => store.request("GET", url);
//   store.post = (url, params) => store.request("POST", url, params);
// //   store.patch = (url, params) => store.request("PATCH", url, params);
//   store.delete = (url, params) => store.request("DELETE", url, params);

//   // return the customized store
//   return store;
// }
