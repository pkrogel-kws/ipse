<script>
  //   export let id = "";
  export let name = "";
  export let label = "";
  export let checked = false;
  export let disabled = false;
</script>

<!-- Toggle A -->
<div class="flex items-center w-full h-10">
  <label for={name} class="flex items-center cursor-pointer">
    <!-- toggle -->
    <div class="relative">
      <!-- input -->
      <input
        id={name}
        {name}
        type="checkbox"
        class="sr-only"
        {disabled}
        bind:checked
      />
      <!-- line -->
      <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner" />
      <!-- dot -->
      <div
        class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"
      />
    </div>
    <!-- label -->
    <div class="ml-3 text-gray-700 font-medium">
      {label}
    </div>
  </label>
</div>

<style>
  /* Toggle A */
  input:checked ~ .dot {
    transform: translateX(100%);
    background-color: #48bb78;
  }
</style>
