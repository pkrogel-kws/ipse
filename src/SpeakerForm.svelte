<script>
  import { createForm } from "felte";

  import TextInput from "./TextInput.svelte";
  import TextArea from "./TextArea.svelte";
  import DateInput from "./DateInput.svelte";

  import { put } from "./api";

  export let data;
  export let handleClose;

  const { form, reset } = createForm({
    onSubmit: (values) => {
      console.log("Form.onSubmit", values);
      put(values);
    },
  });
</script>

<form use:form class="flex flex-col justify-center items-stretch min-w-xl">
  <div
    class="flex  w-full justify-center bg-white rounded-lg mx-auto flex flex-col p-4"
  >
    <TextInput label="ID" name="ID" value={$data.ID} disabled />
  </div>
  <div class="flex justify-center items-center">
    <div
      class="flex  w-full justify-center bg-white rounded-lg mx-auto flex flex-col p-4"
    >
      <TextInput
        label="Event Code"
        name="Event_Code"
        value={$data.Event_Code}
        disabled
      />
      <TextInput
        label="Start"
        name="Function_Start_Date"
        value={$data.Function_Start_Date}
      />

      <!-- <DateInput
        label="Start"
        value={$data.Function_Start_Date}
        selected={new Date($data.Function_Start_Date)}
      /> -->
      <TextInput
        label="Show PPT?"
        name="PPT_NO_SHOW"
        value={$data.PPT_NO_SHOW}
      />
    </div>
    <div
      class="flex  w-full justify-center bg-white rounded-lg mx-auto flex flex-col p-4"
    >
      <TextInput label="Function Code" value={$data.Function_Code} disabled />
      <TextInput
        label="End"
        name="Function_End_Date"
        value={$data.Function_End_Date}
      />
      <TextInput label="Role" name="Role" value={$data.Role} />
    </div>
  </div>
  <div
    class="flex  w-full justify-center bg-white rounded-lg mx-auto flex flex-col p-4"
  >
    <TextInput
      label="Title"
      name="Presentation_Title"
      value={$data.Presentation_Title}
    />
    <TextInput label="Track" name="Track" value={$data.Track} />
    <TextArea
      label="Description"
      name="Presentation_Description"
      value={$data.Presentation_Desc}
    />
  </div>
  <div class="mx-8 flex">
    <button
      class="text-primary bg-transparent border border-solid border-primary hover:bg-primary hover:text-white active:bg-primary-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
      on:click={handleClose}
    >
      Discard
    </button>
    <button
      class="text-primary bg-transparent border border-solid border-primary hover:bg-primary hover:text-white active:bg-primary-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
      on:click={reset}
    >
      Reset
    </button>
    <div class="flex-grow" />
    <button
      class="bg-primary text-white active:bg-primary-600 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:bg-primary-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="submit"
    >
      <i class="fas fa-heart" /> Save
    </button>
  </div>
</form>
