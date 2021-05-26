<script>
  export let label;
  export let value;
  export let name;
  export let disabled = false;
  export let readOnly = false;
  export let required = false;
</script>

<div h="10" mb="5" class="relative input-component">
  <input
    {required}
    {disabled}
    {readOnly}
    id={name}
    type="text"
    {name}
    {value}
    h="full"
    w="full"
    border="gray-300"
    px="2"
    rounded="sm"
    transition="all"
  />
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
