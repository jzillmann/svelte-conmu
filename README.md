# svelte-conmu

A Svelte Context Menu Library. Headless, the rendering/styling is completely in your hands.
The only things the library provides are:

- Anchors the menu to the cursor in a way that it doesn't leave the screen
- Makes sure the menu closes properly
  - On clicks/right-clicks outside of the menu
  - On menu selection
  - On `Escape` keypress

Get a taste with the [demo](https://jzillmann.github.io/svelte-conmu).

## Getting started

1. Install the library with `npm install --save-dev svelte-conmu`
2. Setup one component - lets call it `ContextMenu.svelte` - which renders all the context menus you will have.

   - First import `ContextMenuWrapper`:

   ```JavaScript
    import { ContextMenuWrapper } from "svelte-conmu";
   ```

   - The `ContextMenuWrapper` will pass you the `options`. You will define those later on. Here it's only about the look:

   ```Svelte
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
   ```

   - **Note** how you could encode different type of contexts menu elements (like `select option`, `seperator` & `info` just by evaluating the option.)

3. Add the **context menu trigger** and the **options to show** in any component you want.

   - In the `script` section add this:

   ```TypeScript
   import { contextMenu, type ContextMenuOption } from "svelte-conmu";

   const contextMenuOptions: ContextMenuOption[] = [
    {
      label: "Do A",
      onSelect: doAFunction,
    },
    { label: "hr" },
    {
      label: "Do B",
      onSelect: doBFunction,
    },
    ...
   ];
   ```

   - and in the `html` section add the `trigger`:

   ```Svelte
   <div on:contextmenu|preventDefault|stopPropagation={(e) =>contextMenu.toggle(e, contextMenuOptions)}>My Content</div>
   ```

4. Final Step. Put the `ContextMenu.svelte` you build in the first step into your `App.svelte`

```Svelte
<ContextMenu />
```

- It doesn't matter `where` since the positioning is `absolute`. Also this display (`show/not-show`) will be handled by the library.

For full example see https://github.com/jzillmann/svelte-conmu/tree/main/example.

## Develop

- `npm build` to build the package
- `npm link` to make the package locally available (e.g. for the example project)

## How to release

- `npm publish`
- tag with
  - `git tag -a $releaseVersion -m "$releaseVersion release"`
  - `git push --tags`
- Increase version in `package.json`

## Notes

Inspired by https://svelte.dev/repl/6fb90919e24942b2b47d9ad154386b0c?version=3.49.0.
