export * from "./src";

import { App } from "./types";
import * as components from "./src";

export default {
  install: (app: App) => {
    for (let c in components) {
      app.use((components as any)[c])
    }
  }
};