# 组件开发

<br />
<br />

* 组件开发写在目录`components/src`下，比如`button`组件目录如下
  ```
  -- components
    -- src
      -- button
        -- style 样式文件目录
        -- button.vue 组件主要逻辑
        -- index.ts 导出组件
      -- conponents.d.ts 组件name属性的声明方式文件
      -- index.ts 导出全部（button、icon、input...）组件
    -- index.ts 组件库入口文件
  ```

* button.vue 开发示例
  ```vue
  <template>
    <button class="h-button" :class="buttonStyle">
      <slot />
    </button>
  </template>

  <script lang="ts" setup>
    import "./style/index.less";
    
    import { computed } from "vue";

    //组件命名
    defineOptions({ name: 'h-button' });

    type BtnProps = {
      type?: string
    }
    const btnProps = defineProps<BtnProps>();

    const buttonStyle = computed(() => {
      return {
        [`h-button--${btnProps.type}`]: btnProps.type
      }
    });
  </script>
  ```

* 导出组件示例(button/index.ts)
  ```js
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
  ```

* 导出全部组件(src/index.ts)
  ```js
  export * from "./button";
  export * from "./...";
  export * from "./...";
  ```

* 组件库入口文件(components/index.ts)
  ```js
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
  ```
