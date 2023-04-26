# 全局组件引入

<br />
<br />

* 如果想要组件库支持全局组件的提示，可以在 src/components.d.ts 文件中声明
  ```js
  import * as components from "./index";

  declare module "@vue/runtime-core" {
    export interface GlobalComponents {
      HButton: typeof components.Button,
      HInput: typeof components.Input,
      HIcon: typeof components.Icon
    }
  }

  export {};
  ```

* 同时在使用组件库的时候需要用户在`tsconfig.json`中配置`types:["hope/lib/src/components"]`当然这里根据你的组件库命名决定
  ```js
  {
    "compilerOptions": {
      ...
      "types": ["hope/lib/src/components"]
    }
  }
  ```
