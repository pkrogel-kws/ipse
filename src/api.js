import basePayload from "./put.json";
// console.log(basePayload, "basePayload.json");

const generatePayloadFromFormData = (data) => {
  return Object.entries(data).map(([Name, Value]) => ({
    $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
    Name,
    Value,
  }));
};

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
    await fetch("/testiMIS/api/CsISPE_Event_Speakers", {
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

/*
export const put = () => {
  fetch("/testiMIS/api/CsISPE_Event_Speakers", {
    //parameter is based on the order of the filters
    method: "PUT",
    data:
      '{"$type":"Asi.Soa.Core.DataContracts.GenericEntityData, Asi.Contracts","EntityTypeName":"CsISPE_Event_Speakers","PrimaryParentEntityTypeName":"Party","Identity":{"$type":"Asi.Soa.Core.DataContracts.IdentityData, Asi.Contracts","EntityTypeName":"CsISPE_Event_Speakers","IdentityElements":{"$type":"System.Collections.ObjectModel.Collection`1[[System.String, mscorlib]], mscorlib","$values":["1000097","668724"]}},"PrimaryParentIdentity":{"$type":"Asi.Soa.Core.DataContracts.IdentityData, Asi.Contracts","EntityTypeName":"Party","IdentityElements":{"$type":"System.Collections.ObjectModel.Collection`1[[System.String, mscorlib]], mscorlib","$values":["1000097"]}},"Properties":{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyDataCollection, Asi.Contracts","$values":[{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"Abstract","Value":""},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"Agreement","Value":{"$type":"System.Boolean","$value":true}},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"Assistant_Info","Value":""},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"Date_Modified","Value":"2017-12-08T12:07:18.97"},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"Event_Code","Value":"NA17CEDEC1"},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"File_Location","Value":"https://www2.ispe.org/imis/conference-handouts/NA17CEDEC1/Dyer_NA17CEDEC1_Contamination-Prevention-and-Response-An-Operational-Mindset.pdf"},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"Function_Code","Value":"SES103B"},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"Function_End_Date","Value":"2017-12-04T17:00:00"},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"Function_Start_Date","Value":"2017-12-04T15:30:00"},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"HEADSHOT_NO_SHOW","Value":{"$type":"System.Boolean","$value":false}},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"ID","Value":"1000097"},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"Invited","Value":{"$type":"System.Boolean","$value":false}},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"Packet_Sent","Value":{"$type":"System.Boolean","$value":true}},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"PPT_NO_SHOW","Value":{"$type":"System.Boolean","$value":false}},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"PPT_Received","Value":{"$type":"System.Boolean","$value":true}},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"Presentation_Desc","Value":"There is no such thing as an acceptable contamination rate. I reject the notion that contamination is part of the business of doing cell culture. If you continue to learn the lessons of contamination, yours and others, by driving actions against a definitive root cause then eventually you will eliminate the risk from the operation. Strict controls and adherence to conservative decision making ensure a high success rate. I will talk through some of my tried and true prevention elements as well as how to manage the on-going risks. We will also discuss how the risks and recovery differ for a viral contamination and how that might impact your prevention controls."},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"Presentation_Received","Value":{"$type":"System.Boolean","$value":false}},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"Presentation_Title","Value":"Contamination Prevention and Response: An Operational Mindset"},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"Record","Value":{"$type":"System.Boolean","$value":false}},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"Recording","Value":""},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"Registered","Value":{"$type":"System.Boolean","$value":false}},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"Removed","Value":{"$type":"System.Boolean","$value":false}},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"Removed_Date","Value":"0001-01-01T00:00:00"},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"Role","Value":"SPKR"},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"SEQN","Value":{"$type":"System.Int32","$value":668724}},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"TIME_STAMP","Value":{"$type":"System.Byte[], mscorlib","$value":"AAAAADayT7E="}},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"Track","Value":"OPERATIONAL AGILITY"},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"UC_1","Value":"Monday 12/4/2017"},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"UC_2","Value":"Monday 12/4/2017"},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"UD_1","Value":"0001-01-01T00:00:00"},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"UD_2","Value":"0001-01-01T00:00:00"},{"$type":"Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts","Name":"UN_1","Value":{"$type":"System.Double","$value":0}}]}}',
    headers: {
      RequestVerificationToken: document.getElementById(
        "__RequestVerificationToken"
      ).value,
    },
    //suffficient auth for users
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data from api", data);
    });
};
*/
