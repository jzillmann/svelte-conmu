import { writable } from "svelte/store";

export interface ContextMenuOption {
  label: string;
  onSelect?: () => void;
}

export interface ContextMenu {
  x: number;
  y: number;
  options: ContextMenuOption[];
}

function createContextMenu(
  e: MouseEvent,
  options: ContextMenuOption[]
): ContextMenu {
  return {
    x: e.clientX,
    y: e.clientY,
    options,
  };
}

export const contextMenu = initializeStore(() => {
  const { set, subscribe, update } = writable<ContextMenu>(null);
  return {
    open: (e: MouseEvent, options: ContextMenuOption[]) => {
      set(createContextMenu(e, options));
    },
    close: () => {
      set(null);
    },
    toggle: (e: MouseEvent, options: ContextMenuOption[]) => {
      update((open) => {
        if (open && open.x == e.clientX && open.y == e.clientY) {
          return null;
        }
        contextMenu.open(e, options);
        return createContextMenu(e, options);
      });
    },
    subscribe,
  };
});

/** Helper function to define and export stores in one step */
function initializeStore<T>(func: () => T): T {
  return func();
}

export function clickOutside(node: HTMLElement) {
  const handleClick = (event: UIEvent) => {
    assertIsNode(event.target);
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent("clickedOutside"));
    }
  };
  document.addEventListener("click", handleClick, true);
  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    },
  };
}

export function contextmenuOutside(node: HTMLElement) {
  const handleClick = (event: UIEvent) => {
    assertIsNode(event.target);
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent("contextMenuedOutside"));
    }
  };
  document.addEventListener("contextmenu", handleClick, true);
  return {
    destroy() {
      document.removeEventListener("contextmenu", handleClick, true);
    },
  };
}

function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !("nodeType" in e)) {
    throw new Error(`Node expected`);
  }
}
