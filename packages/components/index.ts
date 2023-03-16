export * from "./src";

import { App } from "vue";
import * as components from "./src";

export default {
  install: (app: App) => {
    for (let c in components) {
      app.use((components as any)[c])
    }
  }
};