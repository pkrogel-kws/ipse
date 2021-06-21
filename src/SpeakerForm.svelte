<script>
  import { createEventDispatcher, onMount } from "svelte";
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
  import Select from "./Select.svelte";

  export let data;
  export let closeModal;
  export let type;

  let remoteValue;

  const DATE_FIELDS = ["Function_Start_Date", "Function_End_Date"];
  const BOOLEAN_FIELDS = ["SHOW_PPT"];

  const dispatch = createEventDispatcher();

  const {
    form,
    dirty,
    enrichment,
    formValues,
    resetForm,
    submitValues,
    touched,
    updateForm,
    ...rest
  } = formula();

  const onSubmit = async (e) => {
    e.preventDefault();
    const values = transformStringFields(get(formValues));
    try {
      //todo: probably handle this at the form field level rather than form onsubmit level
      transformStringFields(values);
      console.log("Form.onSubmit", values);

      let fieldsToUpdate = Object.entries($dirty)
        .filter(([field, isDirty]) => !!isDirty)
        .map(([key, val]) => key);

      if (type === "create") {
        fieldsToUpdate = [...fieldsToUpdate, "SEQN", "ID"];
        await remoteValue.post(values); //API call
      } else {
        await remoteValue.put(values); //API call
      }
      console.log("need to update: ", fieldsToUpdate);

      const newValues = get(remoteValue).data;
      console.log("newValues from server:", newValues);
      // const derivedDirtyVals = fieldsToUpdate.map((key) => newValues[key]);
      const derivedDirtyVals = fieldsToUpdate.map((key) => [
        key,
        newValues[key],
      ]);
      console.log("need to update form:", derivedDirtyVals);
      //WE NEED TO UPDATE FORM WITH NEW VALUES HERE
      // $data = { ...$data, ...newValues };
      // console.log("set data to", $data);
      updateForm({ defaultValues: newValues });
      dispatch(`entity-${type === "create" ? "created" : "updated"}`, derivedDirtyVals);
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
        // console.log({ key, val }, "date~~~");
        if (val) {
          let date = new Date(val).toISOString();
          // values[key] = date.substring(0, date.length - 1); //remove z at end
          values[key] = date.substring(0, date.length - 2); //remove z and extra  0at end
          return;
        }
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
  $: canSave =
    !!Object.values($dirty).filter((t) => !!t).length || $remoteValue?.loading;
  //TODO:set canSave = false

  // $: console.log($formValues, "formDataChanged");
  $: console.log(type, "form type changed");

  let resetEnd, resetStart;

  const handleReset = () => {
    resetForm();
    // endDatePicker.reset();
    resetEnd();
    resetStart();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await remoteValue.del();
    dispatch("entity-deleted");
    closeModal();
  };

  onMount(async () => {
    console.log('mounted with ', $data);
    remoteValue = await createImisStore($data.ID, $data.SEQN);
  });
  $: console.log("remoteValue", $remoteValue);

  let checked = false;

  const role_select = [
    { description: "Co-Leader", code: "COLDR" },
    { description: "Co-Speaker", code: "COSPKR" },
    { description: "Leader", code: "LDR" },
    { description: "Panelist", code: "PANEL" },
    { description: "Poster Presenter", code: "POSTERP" },
    { description: "Regulatory Speaker", code: "REGSPKR" },
    { description: "Speaker", code: "SPKR" },
  ];
</script>

{#if $remoteValue}
  {#if $remoteValue.error}
    <div bg="red-600" text="white" p="4" m="6" class="rounded">
      {$remoteValue.error}
    </div>
  {:else}
    <form
      use:form
      min-w="3xl"
      display="flex"
      flex="col"
      justify="center"
      items="stretch"
      on:submit={onSubmit}
    >
      {#if $remoteValue?.loading}
        <div bg="white" z="1" inset="0" opacity="50" position="absolute">
          <LoadingSpinner />
        </div>
      {/if}

      <div display="flex">
        <div
          display="flex"
          w="full"
          bg="white"
          rounded="lg"
          mx="auto"
          flex="col"
          p="4"
        >
            <TextInput label="ID" name="ID" value={$data.ID} readOnly />
            <TextInput label="SEQN" name="SEQN" value={$remoteValue.data.SEQN} readOnly />

          <TextInput
            label="Event Code"
            name="Event_Code"
            value={$remoteValue.data.Event_Code}
            required
          />
          <TextInput
            label="Function Code"
            name="Function_Code"
            value={$remoteValue.data.Function_Code}
            required
          />
          <TextInput
            label="Track"
            name="Track"
            value={$remoteValue.data.Track}
          />
          <Switch
            label="Hide PPT"
            name="PPT_NO_SHOW"
            bind:checked={$remoteValue.data.PPT_NO_SHOW}
          />
        </div>
        <div
          bg="white"
          p="4"
          display="flex"
          flex="col"
          w="full"
          rounded="lg"
          mx="auto"
        >
          <DateInput
            label="Start"
            name="Function_Start_Date"
            value={$remoteValue.data.Function_Start_Date}
            bind:reset={resetStart}
            update={formValues.update}
            required
          />
          <DateInput
            label="End"
            name="Function_End_Date"
            value={$remoteValue.data.Function_End_Date}
            bind:reset={resetEnd}
            update={formValues.update}
            required
          />

          <Select
            label="Role"
            name="Role"
            value={$remoteValue.data.Role}
            required
          >
            {#each role_select as role}
              <option value={role.code}>{role.description}</option>
            {/each}
          </Select>
          <TextInput
            label="Assistant"
            name="Assistant_Info"
            value={$remoteValue.data.Assistant_Info}
            required
          />
          <TextInput
            label="Recording"
            name="Recording"
            value={$remoteValue.data.Recording}
            required
          />
        </div>
      </div>
      <div
        bg="white"
        p="4"
        display="flex"
        flex="col"
        mx="auto"
        rounded="lg"
        w="full"
      >
        <TextInput
          label="Title"
          name="Presentation_Title"
          value={$remoteValue.data.Presentation_Title}
          required
        />
        <TextInput
          label="Abstract"
          name="Abstract"
          value={$remoteValue.data.Abstract}
          required
        />
        <TextInput
          label="File Location"
          name="File_Location"
          value={$remoteValue.data.File_Location}
          required
        />
        <TextArea
          label="Description"
          name="Presentation_Desc"
          value={$remoteValue.data.Presentation_Desc}
        />
      </div>
      <div class="mx-8 flex">
        {#if type === "update"}
          <button
            bg="red-500 active:red-600 hover:red-600"
            font="bold"
            text="sm white uppercase"
            px="6"
            py="3"
            rounded="lg"
            outline="none"
            mr="1"
            mb="1"
            duration="150"
            transition="all"
            opacity="disabled:50"
            uppercase
            class="shadow"
            on:click={handleDelete}
          >
            <i class="fas fa-heart" /> Delete
          </button>
        {/if}
        <div class="flex-grow" />

        <button
          text="sm primary uppercase hover:white "
          font="bold"
          bg="transparent hover:primary active:primary-600"
          border="solid primary"
          px="6"
          py="3"
          outline="none"
          mr="1"
          mb="1"
          transition="all"
          duration="150"
          opacity="disabled:50"
          ease="linear"
          class="border "
          rounded="lg"
          type="button"
          on:click={handleReset}
        >
          Reset
        </button>
        <button
          bg="primary hover:primary-600 active:primary-600"
          text="white sm uppercase"
          font="bold"
          px="6"
          py="3"
          rounded="lg"
          outline="none"
          mr="1"
          mb="1"
          ease="linear"
          tranistion="all"
          duration="150"
          opacity="disabled:50"
          class="shadow "
          type="submit"
          disabled={!canSave}
        >
          <i class="fas fa-heart" /> Save
        </button>
      </div>
    </form>
  {/if}
{/if}

<style>
  :global(input) {
    height: 100% !important;
  }
</style>
