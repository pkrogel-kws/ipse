<div
  class="container"
  display="flex"
  items="center"
  justify="center"
  h="full"
  flex="row wrap"
>
  <div class="loader-container" w="1/2" h="1/2" position="relative">
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
</div>

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="gooey">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix
        in="blur"
        mode="matrix"
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
        result="goo"
      />
      <feBlend in="SourceGraphic" in2="goo" />
    </filter>
  </defs>
</svg>

<style>
  /* svg {
    display: none;
  } */

  .loader-container {
    filter: url(#gooey);
  }

  .loader-container > * {
    position: absolute;
    display: inline-block;
    left: 0;
    width: 4rem;
    height: 4rem;
    background: #1ee4f2;
    top: 25%;
    border-radius: 50%;
    animation: loading 4s infinite;
    transform: scale(0.1);
    opacity: 0;
  }
  .loader-container > *:nth-child(1) {
    animation-delay: 0.5s;
  }
  .loader-container > *:nth-child(2) {
    animation-delay: 1s;
  }
  .loader-container > *:nth-child(3) {
    animation-delay: 1.5s;
  }
  .loader-container > *:nth-child(4) {
    animation-delay: 2s;
  }

  @keyframes loading {
    50% {
      transform: scale(1.25);
      left: 50%;
      opacity: 1;
    }
    100% {
      transform: scale(0.1);
      left: 100%;
      opacity: 0;
    }
  }
</style>
