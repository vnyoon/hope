import _Button from "./button.vue";

import type { App, Plugin } from "vue";

type SFCWithInstall<T> = T & Plugin;

const withInstall = <T>(com: T) => {
  (com as SFCWithInstall<T>).install = (app: App) => {
    const name = (com as any).name;

    //注册组件
    app.component(name, com as SFCWithInstall<T>);
  };

  return com as SFCWithInstall<T>;
};

export const Button = withInstall(_Button);
export default Button;