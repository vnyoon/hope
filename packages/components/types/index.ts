import type { App, Plugin } from "vue";

type SFCWithInstall<T> = T & Plugin;

export {
  SFCWithInstall,
  App
}