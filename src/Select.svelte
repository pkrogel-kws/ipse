<script>
  export let label;
  export let value;
  export let name;
  export let disabled;
  export let readOnly;
  export let required;
</script>

<div  class="relative select-component">
  <select
    {required}
    {disabled}
    {readOnly}
    id={name}
    type="text"
    {name}
    {value}
    w="full"
    border="gray-300"
    px="2"
    rounded="5px"
    transition="all"
  >
    <slot />
  </select>
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
  label {
    top: 0%;
    transform: translateY(-50%);
    font-size: 10px;
    color: rgba(37, 99, 235, 1);
  }
  .empty select:not(:focus) + label {
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
  }
  select:not(:focus) + label {
    color: rgba(70, 70, 70, 1);
  }
  select {
    border-width: 1px;
  }
  select:focus {
    outline: none;
    border-color: rgba(37, 99, 235, 1);
  }
</style>
