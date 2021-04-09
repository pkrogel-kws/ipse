<script>
  import TextInput from "./TextInput.svelte";
  import TextArea from "./TextArea.svelte";
  import DateInput from "./DateInput.svelte";

  export let data;
</script>

<div class="flex flex-col justify-center items-stretch min-w-xl">
  <div
    class="flex  w-full justify-center bg-white rounded-lg mx-auto flex flex-col p-4"
  >
    <TextInput label="ID" value={$data.ID} disabled />
  </div>
  <div class="flex justify-center items-center">
    <div
      class="flex  w-full justify-center bg-white rounded-lg mx-auto flex flex-col p-4"
    >
      <TextInput label="Event Code" value={$data.Event_Code} disabled />
      <TextInput label="Start" value={$data.Function_Start_Date} />

      <!-- <DateInput
        label="Start"
        value={$data.Function_Start_Date}
        selected={new Date($data.Function_Start_Date)}
      /> -->
      <TextInput label="Show PPT?" value={$data.PPT_NO_SHOW} />
    </div>
    <div
      class="flex  w-full justify-center bg-white rounded-lg mx-auto flex flex-col p-4"
    >
      <TextInput label="Function Code" value={$data.Function_Code} disabled />
      <TextInput label="End" value={$data.Function_End_Date} />
      <TextInput label="Role" value={$data.Role} />
    </div>
  </div>
  <div
    class="flex  w-full justify-center bg-white rounded-lg mx-auto flex flex-col p-4"
  >
    <TextInput label="Title" value={$data.Presentation_Title} />
    <TextInput label="Track" value={$data.Track} />
    <TextArea label="Description" value={$data.Presentation_Desc} />
  </div>
</div>
