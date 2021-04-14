<script>
  import { createForm } from "felte";
  import { onMount } from "svelte";

  import TextInput from "./TextInput.svelte";
  import TextArea from "./TextArea.svelte";
  import DateInput from "./DateInput.svelte";
  import DateInput2 from "./DateInput2.svelte";
  import DateInput3 from "./DateInput3.svelte";
  import createImisStore from "./imisStore";
  import LoadingSpinner from "./LoadingSpinner.svelte";
  import Switch from "./Switch.svelte";

  export let data;
  export let handleClose;

  let remoteValue;

  const { form, reset, touched, data: formData } = createForm({
    onSubmit: async (values) => {
      try {
        //todo: probably handle this at the form field level rather than form onsubmit level
        Object.entries(values).forEach(([key, val]) => {
          if (val === "True") {
            values[key] = true;
            return;
          }
          if (val === "False") {
            values[key] = false;
            return;
          }
          const maybeDate = new Date(val);
          if(maybeDate !=='Invalid Date' && !isNaN(maybeDate)){
            console.log('date !!! ' + val );
             values[key] = maybeDate.toISOString();
             return;
          }
        });
        console.log("Form.onSubmit", values);

        $remoteValue = values;//API call
      } catch (e) {
        //TODO: handle
      }
    },
  });
  //TODO:implement some form of dirty check
  $: canSave = !!Object.values($touched).filter((t) => !!t).length;

  $: console.log($formData, "formDataChanged");

  let resetEnd, resetStart;

  const handleReset = () => {
    reset();
    // endDatePicker.reset();
    resetEnd();
    resetStart();
  };

  onMount(async () => {
    remoteValue = await createImisStore($data.ID);
    return () => {
      console.log(";~~~~~~~destroy");
    };
  });
  $: console.log("remoteValue", $remoteValue);

  let checked = false;



</script>

<form use:form class="flex flex-col justify-center items-stretch min-w-3xl">
  {#if $remoteValue?.loading}
    <div class="inset-0 opacity-50 absolute bg-white z-1">
      <LoadingSpinner />
    </div>
  {/if}
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
      <!-- <TextInput
        label="Start"
        name="Function_Start_Date"
        value={$data.Function_Start_Date}
      /> -->

      <DateInput
        label="Start"
        name="Function_Start_Date"
        bind:value={$data.Function_Start_Date}
        bind:reset={resetStart}

      />
      <!-- <TextInput
        label="Show PPT?"
        name="PPT_NO_SHOW"
        value={$data.PPT_NO_SHOW}
      /> -->
      <Switch
        label="Hide PPT"
        name="PPT_NO_SHOW"
        bind:checked={$data.PPT_NO_SHOW}
      />
    </div>
    <div
      class="flex  w-full justify-center bg-white rounded-lg mx-auto flex flex-col p-4"
    >
      <TextInput label="Function Code" value={$data.Function_Code} disabled />
      <!-- <TextInput
        label="End"
        name="Function_End_Date"
        value={$data.Function_End_Date}
      /> -->
      <DateInput
        label="End"
        name="Function_End_Date"
        value={$data.Function_End_Date}
        bind:reset={resetEnd}

      />    
        <!-- <DateInput2
        label="End"
        name="Function_End_Date"
        value={$data.Function_End_Date}
      />      -->
        <!-- <DateInput3
        label="End"
        name="Function_End_Date"
        value={$data.Function_End_Date}
        bind:reset={resetEnd}
      /> -->

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
    <div class="flex-grow" />

    <button
      class="text-primary bg-transparent border border-solid border-primary hover:bg-primary hover:text-white active:bg-primary-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none mr-1 mb-1 ease-linear transition-all duration-150 disabled:opacity-50"
      type="button"
      on:click={handleReset}
      
    >
      Reset
    </button>
    <button
      class="bg-primary text-white active:bg-primary-600 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:bg-primary-600 outline-none mr-1 mb-1 ease-linear transition-all duration-150 disabled:opacity-50"
      type="submit"
      disabled={!canSave}
    >
      <i class="fas fa-heart" /> Save
    </button>
  </div>
</form>
