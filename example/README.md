# Example Project svelte-conmu

Example for https://github.com/jzillmann/svelte-conmu.
Most interesting files are:

- [ContextMenu.svelte](src/lib/ContextMenu.svelte) - Implements the rendering of a context menu
- [App.svelte](src/App.svelte) - Puts in `ContextMenu.svelte` + registeres some context menus as well
- [Header.svelte](src/lib/Header.svelte) - Additional context menu setups
- [Footer.svelte](src/lib/Footer.svelte) - Additional context menu setups

## Develop

- `npm link` & `npm run build` in the project root (svelte-conmu)
- `npm link svelte-conmu` in the `example` folder
- `npm run dev` to start the server
- Every time you change something in the library, just execute `npm run build` again (and restart the dev server with `npm run dev` in case there are problems)
