<script lang="ts">
  import { ContextMenuWrapper } from "svelte-conmu";
</script>

<ContextMenuWrapper let:options let:close>
  <div id="context-menu">
    {#each options as option}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      {#if option.label == "hr"}
        <hr />
      {:else if option.onSelect}
        <div class="context-menu-option" on:click={option.onSelect}>
          {option.label}
        </div>
      {:else}
        <div class="context-menu-info" on:click={close}>
          {option.label}
        </div>
      {/if}
    {/each}
  </div>
</ContextMenuWrapper>

<style>
  #context-menu {
    color: #25262a;
    background-color: #e2e3e4;
    border-radius: 0.25rem;
    border-width: 1px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .context-menu-option {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    cursor: pointer;
    white-space: nowrap;
    text-align: left;
  }

  .context-menu-info {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    cursor: help;
    max-width: 90px;
  }

  .context-menu-option:hover {
    color: #e2e3e4;
    background-color: #6a9ef8;
  }

  hr {
    margin-left: auto;
    margin-right: auto;
    width: 91.666667%;
    opacity: 0.25;
  }
</style>
