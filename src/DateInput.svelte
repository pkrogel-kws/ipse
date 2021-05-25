<script>
  import { onMount } from "svelte";
  // import Datepicker from "svelte-calendar";
  import "flatpickr/dist/flatpickr.css";
  import "flatpickr/dist/themes/material_blue.css";
  import Flatpickr from "svelte-flatpickr";
  export let label;
  export let value;
  export let name;
  export let disabled;
  export let update;

  let node;
  export let options = {
    enableTime: true,
    // element: "#my-picker",
  };
  let formattedValue;

  let flatpickr;
  export const reset = () => {
    flatpickr.setDate(value, true);
    // value = initialValue;
  };
  // let initialValue;
  onMount(() => {
    // initialValue = value;
    flatpickr.setDate(value, true);
  });

  $: {
    update((vals) => ({ ...vals, [name]: value }));
  }
  // $: {
  //   updateForm({ [name]: value });
  // }
</script>

<div class="relative h-10 input-component mb-5">
  <div
    h="full"
    w="full"
    border="gray-300"
    px="2"
    rounded="sm"
    transition="all"
    items="stretch"
    display="flex"
    class="input"
  >
    <!-- <Datepicker id={label} name="name" bind:selected /> -->
    <Flatpickr
      {options}
      bind:value
      bind:formattedValue
      name={`${name}_formatted`}
      {disabled}
      bind:flatpickr
    />
    <input type="text" {name} bind:value readonly style="display:none;" />
    <!-- <Flatpickr {options} bind:value bind:formattedValue {name}>
      <div class="flatpickr" id="my-picker">
        <input
          type="text"
          placeholder="Select Date.."
          data-input
          bind:this={node}
        />

        <a class="input-button" title="clear" data-clear>
          <i class="icon-close" />
        </a>
      </div></Flatpickr
    >-->
  </div>
  <label
    for="name"
    bg="white"
    px="1"
    left="2"
    transition="all"
    position="absolute"
  >
    {label}
  </label>
</div>

<style>
  :global(.flatpickr-input) {
    width: 100%;
    background: white !important;
  }
  label {
    top: 0%;
    transform: translateY(-50%);
    font-size: 11px;
    color: rgba(37, 99, 235, 1);
  }
  .empty .input:not(:focus) + label {
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
  }
  .input:not(:focus) + label {
    color: rgba(70, 70, 70, 1);
  }
  .input {
    border-width: 1px;
  }
  .input:focus {
    outline: none;
    border-color: rgba(37, 99, 235, 1);
  }
</style>
