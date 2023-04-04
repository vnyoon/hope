# hope
  * 基于Vite4+TypeScript的Vue3组件库开发框架
  * hope是一个 Vue3 组件库开发环境框架，采用最新的 Vite4+TypeScript 为技术栈，支持按需加载、单元测试、自动打包与发布等功能，让我们能更专注于业务组件的开发。

## 一、Monorepo项目搭建
  * Monorepo：就是一个代码库里包含很多的项目，而这些项目虽然是相关联的，但是在逻辑上是独立的，可以由不同人或者团队来维护；

### 1.1. pnpm初始化项目
  * pnpm 对于包的管理是很方便的，尤其是对于一个 Monorepo 的项目。因为对于我们即将开发的组件库来说可能会存在多个 package(包)，而这些包在我们本地是需要相互关联测试的，刚好 pnpm 就对其天然的支持。其实像其它包管理工具，比如 yarn、lerna 等也能做到，但是相对来说比较繁琐。而 pnpm 现在已经很成熟了，像 Vant，ElementUI 这些明星组件库都在使用 pnpm，因此本项目也采用 pnpm 作为包管理工具。
#### 安装
  * npm i pnpm -g
#### 初始化
  * 在项目根目录执行`pnpm init`，会自动生成`package.json`文件；
    ```js
      {
        "name": "hope",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1"
        },
        "keywords": [],
        "author": "",
        "license": "ISC"
      }
    ```
    

### 1.2. 包管理
#### 新建 packages 文件夹用于存放我们的各种包；
  * 创建 first和second 两个文件夹（以下简称f、s）当作已有的两个包，用于测试pnpm的本地引用；
  * 分别在 f 和 s 目录下执行`pnpm init`初始化；
  * 更改 f/s 下面package.json文件里的包名（name：'frist/second' -> '@hope/frist / @hope/second'），表示这个包属于hope这个组织下的；
#### 验证本地包的关联；
  * 在 s 入口文件index.js 引入 f 的入口文件index.js 导出的函数，并调用；
  * 在根目录新建 pnpm-workspace.yaml 文件，这样就表示 packages 目录下的所有包都被关联了；
    ```js
      packages:
        - 'packages/**'
    ```
  * s文件里引入了f包，所以要在s目录下安装f包 `pnpm add @hope/first`，这时可以在s的package.json里看到依赖包；
    ```js
      "dependencies": {
        "@hope/first": "workspace:^1.0.0"
      }
    ```
  * 因为我们在文件里使用的是ESModule语法，所以两者入口文件里添加字段"type": "module"，最后执行node index.js，有打印f文件里的log就证明完成了本地包的关联；


## 二、组件库的环境配置
* 在项目中引入 ts 以及手动搭建一个用于测试组件库组件的 Vue3 项目；
* 因为我们是使用 Vite+Ts 开发的是 Vue3 组件库，所以我们需要安装ts、vue3，同时项目采用 Less 进行组件库样式的管理；
* 使用pnpm如果要安装在项目根目录下，则需要加-w：`pnpm add vue typescript less -D -w`；

### 2.1. 初始化TypeScript
* 在根目录执行`npx tsc --init`会自动生成 ts 的配置文件`tsconfig.json`；
* 调整：
  ```js
    {
      "compilerOptions": {
        // 文件路径在解析时的基本url
        "baseUrl": ".",
        // jsx的处理方式（保留原有的jsx格式）
        "jsx": "preserve",
        // 打开所有的严格模式检查
        "strict": true,
        // 目标代码
        "target": "ES2015",
        // 生成代码使用的模块化
        "module": "ESNext",
        // 跳过对整个库进行类型检测，而仅仅检测你用到的类型
        "skipLibCheck": true,
        // 可以让es module 和 Commonjs 相互调用
        "esModuleInterop": true,
        // 按照node的模块解析规则
        "moduleResolution": "node",
        // 指定我们需要使用到的库（也可以不配置，直接根据target来获取）
        "lib": ["ESNext", "DOM"]
      }
    }
  ```

### 2.2. 基于Vite的Vue3项目
  * 创建一个基于Vite的Vue3项目来对组件库进行调试、测试；
  * 在根目录新建一个叫 play 的文件夹然后初始化pnpm init，后续的组件调试就在这个项目下进行；
#### 安装插件
  * 需要安装vite 和 vitejs/plugin-vue 插件，@vitejs/plugin-vue插件是为了解析后缀为.vue文件；
  * `pnpm add vite @vitejs/plugin-vue -D`；
#### 配置vite.config.ts
  * 新建vite.config.ts配置文件；
    ```js
    import { defineConfig } from "vite";
    import vue from "@vitejs/plugin-vue";

    export default defineConfig({
      plugins: [vue()]
    });
    ```
#### 新建html文件
  * @vitejs/plugin-vue会默认加载 play 下的 index.html；
  * 因为 vite 是基于 esmodule 的，所以script标签中需要添加type="module"；
#### 新建App.vue文件
#### 新建入口main.ts文件
#### 配置脚本启动项目
  * 在package.json配置scripts脚本；
  * 此时执行`pnpm run dev`就能启动项目了，页面上展示App.vue文件里的内容证明成功；
#### 关联本地包
  * 因为 play 项目需要测试本地的组件库，所以也需要将 play 和我们的组件库关联在一起。修改pnpm-workspace.yaml文件；
  ```js
    packages:
    - 'packages/**'
    - 'play'
  ```
  * 此时 play 项目便可以安装本地 packages 下的包了
#### ts 识别.vue文件
  * ts 无法识别*.vue文件，所以引入组件时编译器会报红；
  * 新建一个声明文件shims-vue.d.ts，让 ts 认识*.vue的文件；

## 三、开发一个组件
### 3.1. 创建组件
  * 在packages下新建components和utils两个文件夹，components就是我们组件存放的位置，而utils包则是存放一些公共的方法之类的；
    - 在components目录新建src文件夹（存放组件：button、input...）和index.ts文件（导出所有组件提供给外部使用）；
    - 在src目录新建button文件夹和index.ts文件（集中导出src下的所有组件）；
    - 在button目录新建button.vue和index.ts文件（用于到处btn.vue组件）；
  * 分别在两个文件夹下执行pnpm init，并把包名更改为@hope/components和@hope/utils；

### 3.2. 测试组件
  * 在我们的vue3项目（play文件夹）中本地安装@hope/components：`pnpm add @hope/components`；
  * 然后在App.vue中引入Button；

### 3.3. 全局注册组件
  * 使用app.use()插件它会自动调用传入参数里的自带函数install() 并传入app，因此我们给每个组件添加一个 install 方法，然后再导出整个组件库。更改button/index.ts文件；
  * 调整components/index.ts文件；
  * 在play/main.ts中全局挂载组件库；
  * 此时我们需要给button.vue一个name，在注册组件的时候作为组件名使用；
  * app.vue 中使用h-button组件，页面显示按钮，就是组件库注册成功了；
  #### 全局组件添加提示
    * 安装插件`pnpm add @vue/runtime-core -D -w`；  
    * 在src下新建components.d.ts声明文件；

### 3.4. 组件开发
  * 一个组件需要接受一些参数来实现不同效果，比如 Button 组件就需要接收type、size、round等属性；
  * 根据传入的不同type来赋予 Button 组件不同类名，展示不同样式；

## 四、使用Vite打包组件库
### 4.1. 打包配置
  * vite 专门提供了库模式的打包方式，安装 vite 以及@vitejs/plugin-vue：`pnpm add vite @vitejs/plugin-vue -D -w`；
  * 在packages/components目录下新建vite.config.ts配置文件；
  * 然后在同目录下package.json文件里的scripts配置打包命令；
    ```js
    "scripts": {
      "build": "vite build"
    }
    ```
  * 执行`npm run build`；

### 4.2. 打包声明文件
  * 在打包的库里加入声明文件(.d.ts)；
  * 安装vite-plugin-dts：`pnpm add vite-plugin-dts@1.4.1 -D -w`；
  * 调整vite.config.ts文件；

## 五、[前端流程化控制工具gulp的使用](https://github.com/one-season/gulp-practice)

## 六、使用 gulp 打包组件库并实现按需加载
  * 使用 Vite 库模式打包的时候，vite 会将样式文件全部打包到同一个文件中，这样的话我们每次都要全量引入所有样式文件做不到按需引入的效果。所以打包的时候我们可以不让 vite 打包样式文件，样式文件将使用 gulp 进行打包；
### 6.1. 自动按需引入插件
  * 现在很多组件库的按需引入都是借助插件来解决的，比如ElementPlus是使用`unplugin-vue-components`和`unplugin-auto-import`；
  * 这两个插件可以实现：
    ```js
    import { Button } from "easyest";

    //相当于
    import "easyest/es/src/button/style/index.css";
    import "easyest/es/src/button/index.mjs";
    ```

### 6.2. 删除打包文件函数
  * 在打包之前是需要将前面打包的文件删除的，所以需要先写一个删除函数。在此之前，先在 components下 新建一个 script 文件夹用于存放脚本相关内容；
  * 在 script/utils 中新建 paths.ts 用于维护组件库路径。安装插件：`pnpm add @types/node -D -w`；
    ```js
    import { resolve } from "path";

    // 组件库根目录
    export const componentPath = resolve(__dirname, '../../');

    // packages根目录
    export const pkgPath = resolve(__dirname, '../../../');
    ```
  * 删除打包目录函数可以放在 script/utils 中的 delpath.ts，注意这里因为打包后的 hope 包是最终要发布的包，所以需要将`package.json`和`README.md`保留下来；
    ```js
    import fs from "fs";
    import { resolve } from "path";
    import { pkgPath } from "./paths";

    const stayFile = ['package.json', 'README.md'];

    const delPath = async (path: string) => {
      let files: string[] = [];
      
      if (fs.existsSync(path)) {
        files = fs.readdirSync(path);

        files.forEach(async file => {
          let currentPath = resolve(path, file);

          if (fs.statSync(currentPath).isDirectory()) {
            if (file != 'node_modules') await delPath(currentPath);
          } else {
            if (!stayFile.includes(file)) {
              fs.unlinkSync(currentPath)
            }
          }
        });

        if (path !== `${pkgPath}/hope`) fs.rmdirSync(path);
      }
    };

    export default delPath;
    ```

### 6.3. 使用gulp执行删除任务
  * 我们需要使用 ts 以及新的 es6 语法，而 gulp 是不支持的，所以我们需要安装一些依赖使得 gulp 支持这些，其中 sucras 让我们执行 gulp 可以使用最新语法并且支持 ts；安装依赖：`pnpm i gulp @types/gulp sucrase -D -w`；
  * 在script/build/index.ts文件来定义删除任务；
    ```js
    import delPath from "../utils/delpath";
    import { pkgPath } from "../utils/paths";
    import { series } from "gulp";

    // 删除hope
    export const removeDist = () => {
      return delPath(`${pkgPath}/hope`);
    };

    export default series(async () => removeDist());
    ```
  * 然后在根目录 hope/package.json 添加脚本；
    ```js
    "scripts": {
      "build:hope": "gulp -f packages/components/script/build/index.ts"
    }
    ```
  * 此时根目录执行`pnpm run build:hope`就会发现 hope 下的文件被删除了；

### 6.4. gulp打包样式
  * 因为用的是 less 写的样式，所以需要安装gulp-less，同时在安装一个自动补全 css 兼容前缀插件gulp-autoprefixer以及它们对应的上面文件：
    - `pnpm add gulp-less @types/gulp-less gulp-autoprefixer @types/gulp-autoprefixer -D -w`
  * 然后写一个打包样式的函数，script/build/index.ts 改动；

### 6.5. gulp打包组件
  * 写一个执行命令的工具函数，在 script/utils/run.ts；
  * 在打包组件函数中引入执行命令的工具函数；
  * 打包样式和打包组件可以并行，所以更改build/index.ts；
  * 最后 vite 打包的时候忽略 less 文件，改动components/vite.config.ts文件；
  * 为了更好的看打包后的效果，可以再写一个简单的 Icon 组件，执行`pnpm run build:hope`，即可完成打包；
  * 由于 vite 打包忽略了 less 文件打包，所以打包后的文件遇到.less 文件的引入会自动跳过，所以引入代码没变，但是我们已经将 less 文件打包成 css 文件了，所以我们需要将代码中的.less换成.css；
    - 在components/vite.config.ts 中的 plugins 中新增改改动代码，最后执行`pnpm run build:hope`；