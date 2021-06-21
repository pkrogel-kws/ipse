// export default {
//   Abstract: null,
//   Agreement: null,
//   Assistant_Info: null,
//   Date_Modified: null,
//   Event_Code: null,
//   File_Location: null,
//   Function_Code: null,
//   Function_End_Date: null,
//   Function_Start_Date: null,
//   ID: null,
//   Invited: null,
//   Packet_Sent: null,
//   PPT_NO_SHOW: null,
//   PPT_Received: null,
//   Presentation_Received: null,
//   Presentation_Title: null,
//   Record: null,
//   Recording: null,
//   Registered: null,
//   Removed: null,
//   Removed_Date: null,
//   Role: null,
//   SEQN: null,
//   Track: null,
//   UC_1: null,
//   UC_2: null,
//   UD_1: null,
//   UD_2: null,
//   UN_1: null,
//   Presentation_Desc: null,
// };
const empty_object = {
  $type: "Asi.Soa.Core.DataContracts.GenericEntityData, Asi.Contracts",
  EntityTypeName: "CsISPE_Event_Speakers",
  PrimaryParentEntityTypeName: "Party",
  Identity: {
    $type: "Asi.Soa.Core.DataContracts.IdentityData, Asi.Contracts",
    EntityTypeName: "CsISPE_Event_Speakers",
    IdentityElements: {
      $type:
        "System.Collections.ObjectModel.Collection`1[[System.String, mscorlib]], mscorlib",
      $values: [null, null],
      //   $values: ["ID", "SEQN"],
    },
  },
  PrimaryParentIdentity: {
    $type: "Asi.Soa.Core.DataContracts.IdentityData, Asi.Contracts",
    EntityTypeName: "Party",
    IdentityElements: {
      $type:
        "System.Collections.ObjectModel.Collection`1[[System.String, mscorlib]], mscorlib",
      $values: [null],
      //   $values: ["ID"],
    },
  },
  Properties: {
    $type:
      "Asi.Soa.Core.DataContracts.GenericPropertyDataCollection, Asi.Contracts",
    $values: [
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "Abstract",
        Value: null,
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "Agreement",
        Value: { $type: "System.Boolean", $value: null },
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "Assistant_Info",
        Value: null,
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "Date_Modified",
        Value: null,
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "Event_Code",
        Value: null,
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "File_Location",
        Value: null,
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "Function_Code",
        Value: null,
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "Function_End_Date",
        Value: null,
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "Function_Start_Date",
        Value: null,
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "ID",
        Value: null,
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "Invited",
        Value: { $type: "System.Boolean", $value: null },
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "Packet_Sent",
        Value: { $type: "System.Boolean", $value: null },
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "PPT_NO_SHOW",
        Value: { $type: "System.Boolean", $value: null },
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "PPT_Received",
        Value: { $type: "System.Boolean", $value: null },
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "Presentation_Received",
        Value: { $type: "System.Boolean", $value: null },
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "Presentation_Title",
        Value: null,
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "Record",
        Value: { $type: "System.Boolean", $value: null },
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "Recording",
        Value: null,
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "Registered",
        Value: { $type: "System.Boolean", $value: false },
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "Removed",
        Value: { $type: "System.Boolean", $value: false },
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "Removed_Date",
        Value: "0001-01-01T00:00:00",
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "Role",
        Value: null,
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "SEQN",
        Value: { $type: "System.Int32", $value: null },
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "TIME_STAMP",
        Value: {
          $type: "System.Byte[], mscorlib",
          $value: "AAAAACnCqlY=",
        },
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "Track",
        Value: null,
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "UC_1",
        Value: null,
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "UC_2",
        Value: null,
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "UD_1",
        Value: "0001-01-01T00:00:00",
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "UD_2",
        Value: "0001-01-01T00:00:00",
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "UN_1",
        Value: { $type: "System.Double", $value: 0.0 },
      },
      {
        $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
        Name: "Presentation_Desc",
        Value: null,
      },
    ],
  },
};

export default () =>  JSON.parse(JSON.stringify(empty_object));