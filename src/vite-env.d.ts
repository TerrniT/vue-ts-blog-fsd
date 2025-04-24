/// <reference types="vite/client" />

// Add Vue component type declarations
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// Add path alias for TypeScript
declare module '@/*' {
  const value: any;
  export default value;
}