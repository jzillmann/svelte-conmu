/// <reference types="svelte" />
/// <reference types="vite/client" />

declare namespace svelte.JSX {
  interface HTMLProps<T> {
    onclickedOutside?: (e: CustomEvent) => void;
    oncontextMenuedOutside?: (e: CustomEvent) => void;
  }
}
