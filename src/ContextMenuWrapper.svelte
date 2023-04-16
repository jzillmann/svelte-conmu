<script lang="ts">
  import ContextMenuContainer from "./ContextMenuContainer.svelte";
  import { contextMenu, type ContextMenuOption } from "./context-menu";

  function wrapOptions(options: ContextMenuOption[]) {
    return options.map((o) => {
      if (o.onSelect) {
        return {
          ...o,
          onSelect: () => {
            o.onSelect();
            contextMenu.close();
          },
        };
      }
      return o;
    });
  }
</script>

{#if $contextMenu}
  <ContextMenuContainer menuLeft={$contextMenu.x} menuTop={$contextMenu.y}>
    <slot
      options={wrapOptions($contextMenu.options)}
      close={contextMenu.close}
    />
  </ContextMenuContainer>
{/if}
