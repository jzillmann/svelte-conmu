<script lang="ts">
  import { clickOutside, contextmenuOutside } from "./context-menu";

  export let menuLeft: number;
  export let menuTop: number;
  export let close: () => void;

  let menuElement: HTMLElement;

  $: {
    if (menuElement) {
      // Change the position of the context menu based on the menu size, the context menu click and the window size.
      // The position is controlled by `top` and `left`  at inline style.
      if (window.innerHeight - menuTop < menuElement.offsetHeight)
        menuTop = menuTop - menuElement.offsetHeight;
      if (window.innerWidth - menuLeft < menuElement.offsetWidth)
        menuLeft = menuLeft - menuElement.offsetWidth;
    }
  }
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === "Escape") close();
  }}
/>

<div
  id="context-menu-container"
  style="top:{menuTop}px; left:{menuLeft}px"
  bind:this={menuElement}
  use:clickOutside
  on:clickedOutside={close}
  use:contextmenuOutside
  on:contextMenuedOutside={close}
>
  <slot />
</div>

<style>
  #context-menu-container {
    position: absolute;
    z-index: 10000;
  }
</style>
