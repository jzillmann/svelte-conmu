<script lang="ts">
  import { contextMenu, type ContextMenuOption } from "svelte-conmu";

  let colorSwitched = false;

  const contextMenuOptions: ContextMenuOption[] = [
    {
      label: "Switch Color",
      action: () => (colorSwitched = !colorSwitched),
    },
    { label: "hr" },
    {
      label: "Log to console",
      action: () => console.log("logged to console"),
    },
    {
      label: "Close window",
      action: () => window.close(),
      disabled: () => colorSwitched == false,
    },
  ];
</script>

<footer
  class:colorSwitched
  on:contextmenu|preventDefault|stopPropagation={(e) =>
    contextMenu.toggle(e, contextMenuOptions)}
>
  <h3>Footer with context menu</h3>
</footer>

<style>
  footer {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 80px;
    display: flex;
    place-items: center;
    justify-items: center;
    color: black;
    background-color: blanchedalmond;
    cursor: context-menu;
  }

  h3 {
    width: 100%;
  }

  .colorSwitched {
    color: blanchedalmond;
    background-color: black;
  }
</style>
