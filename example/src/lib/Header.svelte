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
      label: "Alert",
      action: () => alert("Context triggered alert!"),
    },
  ];
</script>

<footer
  class:colorSwitched
  on:contextmenu|preventDefault|stopPropagation={(e) =>
    contextMenu.toggle(e, contextMenuOptions)}
>
  <h3>Header with context menu</h3>
</footer>

<style>
  footer {
    position: fixed;
    left: 0px;
    top: 0px;
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
