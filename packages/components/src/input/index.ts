import _Input from "./input.vue";

import { SFCWithInstall, App } from "../../types";

const withInstall = <T>(com: T) => {
  (com as SFCWithInstall<T>).install = (app: App) => {
    const name = (com as any).name;

    //注册组件
    app.component(name, com as SFCWithInstall<T>);
  };

  return com as SFCWithInstall<T>;
};

export const Input = withInstall(_Input);
export default Input;