<script>
  import { fly } from "svelte/transition";
  export let has = {
    header: true,
    body: true,
    footer: true,
  };

  export let transitionType = fly;
  export let transitionProps = { y: 100, duration: 400 };

  let props = {};
  let classname = "";
  $: {
    props = $$props;
    if (props.class) {
      classname = props.class;
    }

    delete props.class;
  }

  $: {
    const { has, ...rest } = $$props;
    props = rest;
  }
</script>

<section
  class={`modal ${classname}`}
  {...props}
  transition:transitionType={transitionProps}
>
  {#if has.header}
    <header class="modal__header">
      <slot name="header">
        {#if props.title}
          <h1 class="modal__title">{props.title}</h1>
        {/if}
      </slot>
    </header>
  {/if}
  {#if has.body}
    <div class="modal__body">
      <slot />
    </div>
  {/if}
  {#if has.footer}
    <header class="modal__footer">
      <slot name="footer" />
    </header>
  {/if}
</section>

<style>
  .modal {
    min-width: 400px;
    min-height: 400px;
    background-color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .modal__header,
  .modal__footer {
    background-color: darkcyan;
    color: white;
    padding: 20px;
  }

  h1 {
    margin: 0;
  }

  .modal__body {
    padding-top: 40px;
    flex: 1 1 0;
  }
</style>
