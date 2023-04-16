<script lang="ts">
  import { contextMenu, type ContextMenuOption } from "svelte-conmu";
  import ContextMenu from "./lib/ContextMenu.svelte";
  import Footer from "./lib/Footer.svelte";
  import Header from "./lib/Header.svelte";

  const headlineOptions: ContextMenuOption[] = [
    {
      label: "See code",
      onSelect: () =>
        window.open(
          new URL(
            "https://github.com/jzillmann/svelte-conmu/tree/main/example"
          ),
          "_blank"
        ),
    },
    {
      label: "Project Page",
      onSelect: () =>
        window.open(
          new URL("https://github.com/jzillmann/svelte-conmu"),
          "_blank"
        ),
    },
  ];

  const subHeadlineOptions: ContextMenuOption[] = [
    {
      label: "Not exactly here... Explore the area indicated by the cursor!",
    },
  ];
</script>

<Header />

<main>
  <h1
    on:contextmenu|preventDefault|stopPropagation={(e) =>
      contextMenu.toggle(e, headlineOptions)}
  >
    Example of svelte-conmu
  </h1>

  <h4>A Svelte Context Menu Library</h4>

  <div
    on:contextmenu|preventDefault|stopPropagation={(e) =>
      contextMenu.toggle(e, subHeadlineOptions)}
  >
    <i>Right click and experiment </i>
  </div>
</main>

<Footer />

<ContextMenu />

<style>
  h1 {
    cursor: context-menu;
  }

  h4 {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
  }
</style>
