declare namespace svelte.JSX {
  interface HTMLProps<T> {
    onclickedOutside?: (e: CustomEvent) => void;
    oncontextMenuedOutside?: (e: CustomEvent) => void;
  }
}
