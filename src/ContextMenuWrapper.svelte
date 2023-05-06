<script lang="ts">
  import ContextMenuContainer from "./ContextMenuContainer.svelte";
  import { contextMenu, type ContextMenuOption } from "./context-menu";

  function wrapOptions(options: ContextMenuOption[]) {
    return options.map((o) => {
      if (o.action) {
        return {
          ...o,
          action: () => {
            if (!o.disabled || !o.disabled()) {
              o.action();
              contextMenu.close();
            }
          },
        };
      }
      return o;
    });
  }
</script>

{#if $contextMenu}
  <ContextMenuContainer
    menuLeft={$contextMenu.x}
    menuTop={$contextMenu.y}
    close={contextMenu.close}
  >
    <slot
      options={wrapOptions($contextMenu.options)}
      close={contextMenu.close}
    />
  </ContextMenuContainer>
{/if}
