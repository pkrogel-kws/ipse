<!-- https://dev.to/vibhanshu909/how-to-create-a-full-featured-modal-component-in-svelte-and-trap-focus-within-474i -->
<script context="module">
  // for passing focus on to the next Modal in the queue.
  // A module context level object is shared among all its component instances. [Read More Here](https://svelte.dev/tutorial/sharing-code)
  const modalList = [];
</script>

<script>
  import { fade, fly } from "svelte/transition";
  import { store as modalStore } from "./";

  export let store = modalStore(false);

  const { isOpen, open, close } = store;
  function keydown(e) {
    e.stopPropagation();
    if (e.key === "Escape") {
      close();
    }
  }
  function transitionend(e) {
    const node = e.target;
    node.focus();
  }
  function modalAction(node) {
    const returnFn = [];
    // for accessibility
    if (document.body.style.overflow !== "hidden") {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      returnFn.push(() => {
        document.body.style.overflow = original;
      });
    }
    // node.addEventListener("keydown", keydown);
    // node.addEventListener("transitionend", transitionend);
    node.focus();
    modalList.push(node);
    returnFn.push(() => {
      // node.removeEventListener("keydown", keydown);
      // node.removeEventListener("transitionend", transitionend);
      modalList.pop();
      // Optional chaining to guard against empty array.
      modalList[modalList.length - 1]?.focus();
    });
    return {
      destroy: () => returnFn.forEach((fn) => fn()),
    };
  }
</script>

<slot name="trigger" {open}>
  <!-- fallback trigger to open the modal -->
  <button on:click={open}>Open</button>
</slot>
{#if $isOpen}
  <div class="modal" use:modalAction tabindex="0">
    <div class="backdrop" on:click={close} transition:fade />

    <div class="content-wrapper" in:fly={{ y: 100, duration: 400 }} out:fade>
      {#if $$slots.header}
        <slot name="header" {store} />
      {/if}

      <div class="content">
        <slot name="content" {store} />
      </div>

      {#if $$slots.footer}
        <slot name="footer" {store}>
          <!-- fallback -->
          <div>
            <h1>Your Modal Footer Goes Here...</h1>
            <button on:click={close}>Close</button>
          </div>
        </slot>
      {/if}
    </div>
  </div>
{/if}

<style>
  div.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
  }
  div.modal:not(:focus-within) {
    transition: opacity 0.1ms;
    opacity: 0.99;
  }
  div.backdrop {
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    width: 100%;
    height: 100%;
  }
  div.content-wrapper {
    z-index: 10;
    max-width: 70vw;
    border-radius: 0.3rem;
    background-color: white;
    overflow: hidden;
  }
  @media (max-width: 767px) {
    div.content-wrapper {
      max-width: 100vw;
    }
  }
  div.content {
    max-height: 80vh;
    overflow: auto;
  }
  h1 {
    opacity: 0.5;
  }
</style>
