import { Readable, writable } from "svelte/store";

export interface ContextMenuOption {
  label: string;
  action?: () => void;
  disabled?: () => boolean;
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

export interface ContextMenuStore extends Readable<ContextMenu> {
  open(e: MouseEvent, options: ContextMenuOption[]): void;
  close(): void;
  toggle(e: MouseEvent, options: ContextMenuOption[]): void;
}

function createContextMenuStore(): ContextMenuStore {
  const { set, subscribe, update } = writable<ContextMenu>(null);

  const open = (e: MouseEvent, options: ContextMenuOption[]) =>
    set(createContextMenu(e, options));

  const close = () => set(null);

  const toggle = (e: MouseEvent, options: ContextMenuOption[]) => {
    update((menu) => {
      if (menu && menu.x == e.clientX && menu.y == e.clientY) {
        return null;
      }
      open(e, options);
      return createContextMenu(e, options);
    });
  };

  return {
    subscribe,
    open,
    close,
    toggle,
  };
}

export const contextMenu = createContextMenuStore();

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
