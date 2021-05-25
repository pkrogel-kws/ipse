<script>
  import { onMount } from "svelte";
  import flatpickr from "flatpickr";

  export let label;
  export let value;
  export let name;
  export let disabled;
  export let readOnly = true;

  export const reset = () => {
    console.log("reset");
    // flatpickerInstance.clear();
    flatpickerInstance.setDate(value, true);
  };

  let node;

  let formattedValue;
  $: date = new Date(value);
  $: console.log("valie", value);

  let flatpickrNode;

  let flatpickerInstance;
  onMount(() => {
    flatpickerInstance = flatpickr(flatpickrNode, {
      enableTime: true,
      onChange: handleFlatpickrChange,
      defaultDate: value,
    });
  });

  let selectedDate = value;
  const handleFlatpickrChange = (selectedDates, dateStr, instance) => {
    selectedDate = selectedDates[0];
    console.log("selectedDAtes", selectedDates);
  };
</script>

<div
  h="10"
  mb="5"
  position="relative"
  class="flatpickr  input-component"
  bind:this={flatpickrNode}
>
  <!-- <Flatpickr {options} {value} bind:formattedValue {name} {disabled} /> -->
  <input
    {disabled}
    {readOnly}
    id={name}
    type="text"
    {name}
    h="full"
    w="full"
    border="gray-300"
    px="2"
    transition="all"
    rounded="sm"
    value={selectedDate}
    placeholder="Select Date.."
  />
  <!-- input is mandatory -->

  <!-- <a class="input-button" title="toggle" data-toggle>
        <i class="icon-calendar"></i>
    </a>

    <a class="input-button" title="clear" data-clear>
        <i class="icon-close"></i>
    </a> -->
  <label
    for="name"
    position="absolute"
    left="2"
    transition="all"
    bg="white"
    px="1"
  >
    {label}
  </label>
</div>

<style>
  label {
    top: 0%;
    transform: translateY(-50%);
    font-size: 11px;
    color: rgba(37, 99, 235, 1);
  }
  .empty input:not(:focus) + label {
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
  }
  input:not(:focus) + label {
    color: rgba(70, 70, 70, 1);
  }
  input {
    border-width: 1px;
  }
  input:focus {
    outline: none;
    border-color: rgba(37, 99, 235, 1);
  }
</style>
