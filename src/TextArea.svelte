<script>
  export let label;
  export let value;
  export let name;
  export let disabled = false;
  export let readOnly = false;
</script>

<div class="relative h-64 input-component mb-5">
  <textarea
    {disabled}
    {readOnly}
    id={name}
    {name}
    type="text"
    rows="50"
    cols="50"
    h="full"
    w="full"
    border="gray-300"
    px="2"
    rounded="sm"
    transition="all"
    {value}
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
  .empty textarea:not(:focus) + label {
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
  }
  textarea:not(:focus) + label {
    color: rgba(70, 70, 70, 1);
  }
  textarea {
    border-width: 1px;
  }
  textarea:focus {
    outline: none;
    border-color: rgba(37, 99, 235, 1);
  }
</style>
