<script>
  // import { createForm } from "felte";
  import { onMount } from "svelte";
  import { formula } from "svelte-formula";
  import { get } from "svelte/store";
  import TextInput from "./TextInput.svelte";
  import TextArea from "./TextArea.svelte";
  import DateInput from "./DateInput.svelte";
  import DateInput2 from "./DateInput2.svelte";
  import DateInput3 from "./DateInput3.svelte";
  import createImisStore from "./imisStore";
  import LoadingSpinner from "./LoadingSpinner.svelte";
  import Switch from "./Switch.svelte";

  export let data;
  export let closeModal;

  let remoteValue;

  const DATE_FIELDS = ["Function_Start_Date", "Function_End_Date"];
  const BOOLEAN_FIELDS = ["SHOW_PPT"];

  const {
    form,
    dirty,
    enrichment,
    formValues,
    resetForm,
    submitValues,
    touched,
    ...rest
  } = formula();

  const onSubmit = async (e) => {
    e.preventDefault();
    const values = transformStringFields(get(formValues));

    try {
      //todo: probably handle this at the form field level rather than form onsubmit level
      transformStringFields(values);
      console.log("Form.onSubmit", values);

      remoteValue.put(values); //API call
    } catch (e) {
      //TODO: handle
    }
  };

  const transformStringFields = (values) => {
    Object.entries(values).forEach(([key, val]) => {
      if (BOOLEAN_FIELDS.includes(key)) {
        if (val === "True") {
          values[key] = true;
          return;
        }
        if (val === "False") {
          values[key] = false;
          return;
        }
      }
      if (DATE_FIELDS.includes(key)) {
        console.log({ key, val }, "date~~~");
        values[key] = new Date(val).toISOString();
        return;
      }
    });
    return values;
  };

  // const { form, reset, touched, data: formData } = createForm({
  //   onSubmit: async (values) => {
  //     try {
  //       //todo: probably handle this at the form field level rather than form onsubmit level
  //       Object.entries(values).forEach(([key, val]) => {
  //         if (val === "True") {
  //           values[key] = true;
  //           return;
  //         }
  //         if (val === "False") {
  //           values[key] = false;
  //           return;
  //         }
  //         const maybeDate = new Date(val);
  //         if(maybeDate !=='Invalid Date' && !isNaN(maybeDate)){
  //           console.log('date !!! ' + val );
  //            values[key] = maybeDate.toISOString();
  //            return;
  //         }
  //       });
  //       console.log("Form.onSubmit", values);

  //       $remoteValue = values;//API call
  //     } catch (e) {
  //       //TODO: handle
  //     }
  //   },
  // });
  //TODO:implement some form of dirty check
  $: canSave =
    !!Object.values($dirty).filter((t) => !!t).length || $remoteValue?.loading;
  //TODO:set canSave = false

  $: console.log($formValues, "formDataChanged");

  let resetEnd, resetStart;

  const handleReset = () => {
    resetForm();
    // endDatePicker.reset();
    resetEnd();
    resetStart();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log("Delete!");
    await remoteValue.del();
    closeModal();
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

<form
  use:form
  class="flex flex-col justify-center items-stretch min-w-3xl"
  on:submit={onSubmit}
>
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
  <div class="flex ">
    <div
      class="flex  w-full justify-center bg-white rounded-lg mx-auto flex flex-col p-4"
    >
      <TextInput
        label="Event Code"
        name="Event_Code"
        value={$data.Event_Code}
        disabled
      />

      <DateInput
        label="Start"
        name="Function_Start_Date"
        bind:value={$data.Function_Start_Date}
        bind:reset={resetStart}
        update={formValues.update}
      />

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

      <DateInput
        label="End"
        name="Function_End_Date"
        value={$data.Function_End_Date}
        bind:reset={resetEnd}
        update={formValues.update}
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
    {#if $data.ID}
      <button
        class="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:bg-red-600 outline-none mr-1 mb-1 ease-linear transition-all duration-150 disabled:opacity-50"
        on:click={handleDelete}
      >
        <i class="fas fa-heart" /> Delete
      </button>
    {/if}
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
