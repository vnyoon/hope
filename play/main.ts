import { createApp } from "vue";
import App from "./App.vue";

import hope from "@hope/components";

const app = createApp(App);

app.use(hope);

app.mount("#app");