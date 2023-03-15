<template>
  <button class="h-button" :class="buttonStyle">
    按钮
  </button>
</template>

<!-- 
  指定组件的name属性几种方式
  
    1. 两个script标签；
    2. 使用插件unplugin-vue-define-options
      * 全局安装：pnpm add unplugin-vue-define-options  -D -w；
      * play/vite.config.ts引入该插件；
      * 可以直接使用defineOptions函数定义组件名了；
      * 需要在tsconfig.json的里写上这句话:
"types": ["unplugin-vue-define-options/macros-global" /* ... */] 声明一下包文件，不然会提示找不到defineOptions函数。
-->

<!-- <script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'h-button'
});
</script>
<script lang="ts" setup></script> -->

<script lang="ts" setup>
  import { computed } from "vue";

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

<style>
  @import './style/index.less';
</style>