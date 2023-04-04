import * as components from "./index";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    HButton: typeof components.Button,
    HInput: typeof components.Input,
    HIcon: typeof components.Icon
  }
}

export {};