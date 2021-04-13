import { writable, readable } from "svelte/store";
import { getApi } from "./api";

const api = getApi();

const createStore = async (id) => {
  console.log("creating imis store for " + id);
  let response = await api.get(id);

  const item = response.Items.$values[0];
  // const currentData = extractValuesFromResponse(response);
  const currentData = response.Items.$values[0];
  const seqn = currentData.Properties.$values.filter(
    ({ Name }) => Name === "SEQN"
  )[0].Value.$value;

  console.log("currentData", currentData);
  const { subscribe, set, update } = writable({
    loading: false,
    response,
    data: currentData,
  });

  const newSet = async (formData) => {
    update((data) => {
      delete data.errors;
      data.loading = true;

      return data;
    });

    // const values = Object.entries(formData).map(([Name, Value]) => ({
    //   $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
    //   Name,
    //   Value,
    // }));

    // const payload = { ...item };
    // payload.Properties.$values = values;
    const payload = patchPayload(currentData, formData);
    console.log("patch?EPayload", payload);

    response = await api.put({ data: payload, seqn, id });
    //TODO:handle errors here
    set(response);
  };
  return { subscribe, set: newSet };
};

const extractValuesFromResponse = (response) => {
  const retVal = {};
  response.Items.$values[0].Properties.$values.forEach(({ Name, Value }) => {
    if (typeof Value === "object") {
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
    if (Value.$value !== undefined) {
      // console.log(
      //   "[before] payload.Properties.$values[idx]=",
      //   payload.Properties.$values[idx]
      // );
      payload.Properties.$values[idx] = { ...Value, $value: newVal };
      // console.log(
      //   "[after] payload.Properties.$values[idx]=",
      //   payload.Properties.$values[idx]
      // );
      return;
    }
    //string
    // console.log(
    //   "[before] payload.Properties.$values[idx]=",
    //   payload.Properties.$values[idx]
    // );
    payload.Properties.$values[idx].Value = newVal;
    // console.log(
    //   "[after] payload.Properties.$values[idx]=",
    //   payload.Properties.$values[idx]
    // );
  });
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
