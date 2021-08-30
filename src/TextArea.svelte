<script>
  export let label;
  export let value;
  export let name;
  export let disabled = false;
  export let readOnly = false;
</script>

<div class="relative h-full flex-grow input-component mb-5 flex">
  <textarea
    {disabled}
    {readOnly}
    id={name}
    {name}
    type="text"

    h="full"
    w="full"
    border="gray-300"
    px="2"
    py="5px"
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
    font-size: 10px;
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
    height: initial;
    border-width: 1px;
  }
  textarea:focus {
    outline: none;
    border-color: rgba(37, 99, 235, 1);
  }
</style>
