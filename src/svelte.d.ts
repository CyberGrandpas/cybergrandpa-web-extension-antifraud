declare module '*.svelte' {
  import { ConstructorOfATypedSvelteComponent } from 'svelte';
  const component: ConstructorOfATypedSvelteComponent | null | undefined;
  export default component;
}
