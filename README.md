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

## 五、[前端流程化控制工具gulp的使用](https://github.com/vnyoon/gulp-practice)

## 六、使用 gulp 打包组件库并实现按需加载
  * 使用 Vite 库模式打包的时候，vite 会将样式文件全部打包到同一个文件中，这样的话我们每次都要全量引入所有样式文件做不到按需引入的效果。所以打包的时候我们可以不让 vite 打包样式文件，样式文件将使用 gulp 进行打包；
### 6.1. 自动按需引入插件
  * 现在很多组件库的按需引入都是借助插件来解决的，比如ElementPlus是使用`unplugin-vue-components`和`unplugin-auto-import`；
  * 这两个插件可以实现：
    ```js
    import { Button } from "hope";

    //相当于
    import "hope/h/src/button/style/index.css";
    import "hope/h/src/button/index.mjs";
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

## 七、使用 release-it 实现自动管理发布组件库
### 7.1. 发布前准备工作
  * 因为要发布的包名为打包后的 hope，因此在 packages/hope 下执行`pnpm init`生成package.json；
    ```js
      {
        "name": "hoped-ui",
        "version": "1.0.0",
        "description": "一个希望的Vue3组件库",
        "main": "lib/index.js",
        "module": "h/index.mjs",
        "files": [
          "h",
          "lib"
        ],
        "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1"
        },
        "keywords": [
          "hopeui",
          "hope-ui",
          "Vue3组件库"
        ],
        "author": "yoon",
        "license": "MIT",
        "sideEffects": [
          "**/*.css"
        ],
        "typings": "lib/index.d.ts",
        "repository": {
          "type": "git",
          "url": "https://github.com/vnyoon/hope.git"
        },
        "homepage": "https://hoped-ui.github.io/hoped/"
      }
    ```
  * 解释一下其中的几个字段：
    - main：组件库入口文件；
    - module：如果使用组件库的环境支持 esmodule 则入口文件变成这个字段；
    - files：发布到 npm 上的文件目录；
    - sideEffects：忽略 tree shaking 带来副作用的代码，比如打包后组件代码中包含了`import "./xxx.css"`，这样会使得构建工具无法知道这段代码是否有副作用(也就是会不会用到其它引入的文件中的代码)，所以构建的时候就会全量打包代码从而失去 esmodule 的自动按需引入功能。因此加上 sideEffects 字段就可以告诉构建工具这段代码不会产生副作用，可以放心的`tree shaking`；
    - typings：声明文件入口；

### 7.2. 关联npmjs手动发布
  * 在打包目录（packages/hope）下执行pnpm publish，注意此时会让你登录 npm 账户，如果没有的话直接去[NPM官网](https://www.npmjs.com/)注册即可，发布之前要将代码提交到仓库或者加上后缀pnpm publish --no-git-checks，然后登录 npm 就能看到刚刚发布的包；

> 每次发布前需要调整package.json中的"version": "1.0.1"，不能和上一个版本的值一样，否则会报没有权限等错误；

### 7.3. 实现自动发布
  * 全局安装release-it：`pnpm add release-it -D -w`；
  * 在打包后目录下的package.json中加入 script 脚本以及 git 仓库地址；
  * 在 components/script 目录下新建 publish/index.ts 用于发布任务；
    ```js
    import run from "../utils/run";
    import { pkgPath } from "../utils/paths"

    import { series } from "gulp";

    export const publishComponent = async () => {
      run("release-it", `${pkgPath}/hope`)
    };

    export default series(async () => publishComponent);
    ```
  * 在根目录的 package.json 文件中新增 scripts 命令 gulp 执行 publish/index.ts
    ```js
    "scripts": {
      "publish:hope": "gulp -f packages/components/script/publish/index.ts"
    },
    ```
  * 将改动提交后根目录执行`pnpm run publish:hope`，就会发现他让我们选择如何提升版本，是否发布，是否加个tag等等；
  * 选择完之后组件库就发布成功了，并且github上也成功加上了一个tag；

## 八、VitePress 搭建部署组件库文档
  * 组件库完成之后，一个详细的使用文档是必不可少的，使用 VitePress 快速搭建一个组件库文档站点并部署到GitHub上；

### 8.1. 安装插件
  * 项目根目录新建 site 文件夹，并在目录下执行pnpm init，然后安装vitepress和vue：`pnpm install -D vitepress vue`；
  * 安装完成之后，site目录下新建 docs/index.md 文件写入：`# Holle hoped！！！`；
  * 然后在 package.json文件 中新增scripts命令；
    ```js
    "scripts": {
      "docs:dev": "vitepress dev docs",
      "docs:build": "vitepress build docs",
      "docs:pre": "vitepress preview docs"
    }
    ```
  * 终端执行命令`pnpm run docs:dev`；

### 8.2. 导航栏配置
  * 在 docs/.vitepress 目录下新建config.js，重启项目就可以看到导航栏已经生效了。此时点击指南和组件是 404,因为我们还没有创建这些目录和文件；
    ```js
    export default {
      themeConfig: {
        siteTitle: "Welcome to hoped-ui~",
        nav: [
          {
            text: "指南",
            link: "/guild/installation"
          },
          {
            text: "组件",
            link: "/components/button/"
          }
        ],
        socialLinks: [
          {
            icon: "github",
            link: "https://github.com/vnyoon/hope"
          }
        ]
      }
    }
    ```
  * 在docs 目录下新建guild/installation.md以及components/button/index.md，再次点击即可跳转对应页面；

### 8.3. 侧边栏配置
  * 同样的在config.js中进行侧边栏配置sidebar；
    ```js
      sidebar: {
        "/guild/": [
          {
            text: "基础",
            items: [
              {
                text: "安装",
                link: "/guild/installation"
              },
              {
                text: "快速开始",
                link: "/guild/quickstart"
              }
            ]
          },
          {
            text: "进阶",
            items: [
              {
                text: "xxx",
                link: "/xxx"
              },
              {
                text: "xxx2",
                link: "/xxx2"
              }
            ]
          }
        ],
        "/components/": [
          {
            text: "基础组件",
            items: [
              {
                text: "Button",
                link: "/components/button"
              },
              {
                text: "Input",
                link: "/components/input"
              }
            ]
          }
        ]
      }
    ```
  
### 8.4. 引入组件库
  * 因为要搭建的是一个组件库文档站点，因此肯定是需要引入组件库的。这里引入的是本地的组件库，所以在 pnpm 的工作空间pnpm-workspace.yaml新增一个site目录；
  * site目录下安装`pnpm add hoped-ui`，然后在 docs/.vitepress 下新建 theme/index.js引入我们的组件库；
  * 回到components/button/index.md 中直接使用我们的 button 组件试一下；

### 8.5. 部署静态站点
  * 打包完成后可以部署到自己的服务器，也可以选择部署到 github 站点上。这里已如何部署到 github 站点为例；
  * github中首先新建一个组织叫做`hoped-ui`，然后再组织下新建一个`hoped`仓库；
  * 然后将site/docs/.vitepress/dist 提交到这个仓库里；
  * 打开仓库为公开，点击 settings，然后左侧选择Pages选项，在构建和部署下面的Branch里，由None切换main或master，选择部署的分支以及目录，这里是根目录，保存刷新后GitHub Pages会有一个地址就是站点地址了；
  * 因为最终访问的地址为`https://hoped-ui.github.io/hoped/`，所以在打包时调整site/docs/.vitepress/config.js文件；
    ```js
    export default {
      base: process.env.NODE_ENV === 'production' ? '/hoped/' : '/',
      ...省略代码
    }
    ```
  * 如果访问出现了404可能base配置出错了，没有样式的话刷新之后等一会，再回来刷新。
  * 以上完成之后便可访问站点[hoped](https://hoped-ui.github.io/hoped/)，站点是实时更新的，只要仓库发生改变站点就会改变；

## 九、搭建一个 Cli 脚手架
  * 实现一个名为`create-hope`脚手架的开发，只需执行命令`npm init hope`就可以将整个组件库开发框架拉到本地；
  
### 9.1. 创建cli包
  * 首先，在packages目录下新建cli目录，终端执行命令`pnpm init`进行初始化，然后把包名更改为`create-hope`；
  > 这里需要知道的是当执行`npm init xxx`或者`npm create xxx`的时候，实际上是执行npx `create-xxx`，所以当执行`npm init hope`的时候实际上就是执行`npx create-hope`；
  * 当执行`create-hope`时会执行 package.json 下的 bin 对应的路径，因此将package.json修改为下，并新建index.js作为入口文件，注意文件开头要加上`#! /usr/bin/env node`；
    ```js
      {
        "name": "create-hope",
        "version": "1.0.0",
        "description": "",
        "bin": "index.js",
        "type": "module",
        "keywords": [],
        "author": "",
        "license": "ISC"
      }
    ```

### 9.2. 使用 command-line-args 处理用户输入命令
  * 使用`command-line-args`进行用户参数解析，安装插件：`pnpm add command-line-args`；
  * 新建一个 cli.js文件 用于处理脚手架的逻辑，这里实现一个 -v 版本命令；
    ```js
    import commandLineArgs from "command-line-args";
    import { readFile } from "fs/promises";

    // 读取文件
    const pkg = JSON.parse(
      await readFile(new URL("./package.json", import.meta.url))
    );

    // 配置命令参数
    const optionDefinitions = [{ name: "version", alias: "v", type: Boolean }];
    const options = commandLineArgs(optionDefinitions);

    if (options.version) {
      console.log(`v${pkg.version}`);
    };
    ```
  * 然后index.js文件导入cli.js之后，终端执行`node index -v`，就能看到控制台输出版本号了；
  * 还可以使用`command-line-usage`插件让它提供帮助命令，安装：`pnpm add command-line-usage`，cli.js文件添加代码，然后终端执行`node index -h`；
    ```js
    import commandLineUsage from "command-line-usage";

    //...代码省略
    // 配置命令参数
    const optionDefinitions = [
      { name: "version", alias: "v", type: Boolean },
      { name: "help", alias: "h", type: Boolean }
    ];
    //...代码省略

    // 帮助命令
    const helpSections = [
      {
        header: "create-hope",
        content: "一个快速生成组件库搭建环境的脚手架"
      },
      {
        header: "Options",
        optionList: [
          {
            name: "version",
            alias: "v",
            typeLabel: "{underline boolean}",
            description: "版本号"
          },
          {
            name: "help",
            alias: "h",
            typeLabel: "{underline boolean}",
            description: "帮助"
          }
        ]
      }
    ];

    if (options.help) {
      console.log(commandLineUsage(helpSections));
    };
    ```

### 9.3. 交互式命令
  * 当我们使用一些脚手架的时候，比如`npm create vite`，它会出现一些选项让我们选择；
  * 使用prompts插件，它可以配置用户输入哪些东西以及单选还是多选等，安装：`pnpm add prompts`，cli.js文件添加代码；
    ```js
    import prompts from "prompts";
    // 添加预设选项
    const promptsOptions = [
      {
        type: "text",
        name: "user",
        message: "用户"
      },
      {
        type: "password",
        name: "password",
        message: "密码"
      },
      {
        type: "select", //单选
        name: "gender",
        message: "性别",
        choices: [
          { title: "男", value: 0},
          { title: "女", value: 1}
        ]
      },
      {
        type: "multiselect", //多选
        name: "study",
        message: "选择学习框架",
        choices: [
          { title: "Vue", value: 0 },
          { title: "React", value: 1 },
          { title: "Angular", value: 2 }
        ]
      }
    ];
    const getUserInfo = async () => {
      const res = await prompts(promptsOptions);
      console.log(res);
    };
    getUserInfo();
    ```
  * 控制台执行`node index`，就会让你输入和选择内容，完了会打印结果，根据对应的值处理不同的逻辑，当然脚手架不需要这么多参数，调整为下面选项；
    ```js
    const promptsOptions = [
      {
        type: "text",
        name: "name",
        message: "请输入项目名称"
      },
      {
        type: "select", //单选
        name: "template",
        message: "请选择一个模板",
        choices: [
          { title: "hoped-ui", value: 1},
          { title: "kitty-ui", value: 2}
        ]
      }
    ];
    ```

### 9.4. 拉取远程仓库模板
  * 拉取远程仓库可以使用 download-git-repo 工具，然后使用它的 clone 方法，同时需要安装一个 loading 插件 ora 以及 log 颜色插件 chalk；
  * 安装插件：`pnpm add download-git-repo ora chalk`，新建utils/gitClone.js文件，添加代码；
    ```js
    import download from "download-git-repo";
    import chalk from "chalk";
    import ora from "ora";

    export default (remote, name, option) => {
      console.log(remote, name, option);
      const downSpinner = ora("正在下载模板...").start();
      
      return new Promise((resolve, reject) => {
        
        download(remote, name, option, err => {
          if (err) {
            downSpinner.fail(chalk.red("下载模板失败！"));
            console.log(chalk.red(err));
            
            reject(err);
            return;
          }

          downSpinner.succeed(chalk.green("模板下载成功！"));
          console.log(chalk.green(`cd ${name}\r\n`));
          console.log(chalk.blue(`pnpm install\r\n`));
          console.log('pnpm run hope:dev\r\n');
          console.log('pnpm run build:hope\r\n');

          resolve();
        });

      })
    };
    ```
  * 调整cli.js文件，最后终端执行`node index.js`，根据终端提示是否下载成功；
    ```js
    import gitClone from "./utils/gitClone.js";

    const getUserInfo = async () => {
      const res = await prompts(promptsOptions);
      console.log(res);
      if (!res.name || !res.template) return;
      
      const remoteList = {
        1: "https://github.com/vnyoon/hope.git",
        2: "https://gitee.com/geeksdidi/kittyui.git"
      };
      gitClone(`direct:${remoteList[res.template]}`, res.name, { clone: true });
    };

    const runOptions = () => {
      if (options.version) {
        console.log(`v${pkg.version}`);
        return;
      };

      if (options.help) {
        console.log(commandLineUsage(helpSections));
        return;
      };

      getUserInfo();
    };
    runOptions();
    ```
  * 最后将create-hope发布即可，发布参考[七、]()。最后随便找个文件夹执行`npm create hope`试一下，hope项目被克隆了下来了就是成功；

## 十、集成项目的编程规范工具链(ESlint+Prettier+Stylelint)
  * 统一的代码规范旨在增强团队开发协作、提高代码质量和打造开发基石；

### 10.1. 集成ESlint
  * `ESLint`是在`ECMAScript/JavaScript`代码中识别和报告模式匹配的工具，它的目标是保证代码的一致性和避免错误；
    - 安装：`pnpm add eslint -D -w`， 初始化ESlint：`pnpm create @eslint/config`；
    - 此时会出现一些选项进行选择：
      ```js
      // 您希望如何使用ESLint？检查语法并发现问题
      How would you like to use ESLint? To check syntax and find problems

      // 您的项目使用什么类型的模块？esm
      What type of modules does your project use? JavaScript modules (import/export)

      // 您的项目使用哪个框架？vue
      Which framework does your project use? · vue

      // 你的项目使用TypeScript吗？是的
      Does your project use TypeScript? · Yes

      // 你的代码在哪里运行？浏览器
      Where does your code run? · browser

      // 您希望配置文件的格式是什么？JavaScript
      What format do you want your config file to be in? · JavaScript

      // Would you like to install them now? 不
      Would you like to install them now? No
      ```
    - 因为框架使用的是 pnpm，所以选择安装那些插件的时候选择了No，这里用 pnpm 手动安装一下：`pnpm i eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest -D -w`；
  * 此时根目录出现了 ESlint 的配置文件.eslintrc.cjs，对这个文件进行配置上的修改；
    ```js
    module.exports = {
        "env": {
            "browser": true,
            "es2021": true,
            "node": true
        },
        "extends": [
            "eslint:recommended",
            "plugin:vue/vue3-essential",
            "plugin:@typescript-eslint/recommended"
        ],
        "globals": {
            defineOptions: true
        },
        "parser": "vue-eslint-parser",
        "parserOptions": {
            "ecmaVersion": "latest",
            "sourceType": "module",
            "parser": "@typescript-eslint/parser"
        },
        "plugins": [
            "vue",
            "@typescript-eslint"
        ],
        "rules": {
            "@typescript-eslint/ban-ts-comment": "off",
            "vue/multi-word-component-names": "off"
        }
    }
    ```
  * 新建`.eslintignore`文件来忽略一些文件的校验；
    ```js
    **.d.ts
    /packages/hope
    dist
    node_modules
    ```
  * 然后在package.json的scripts中添加命令lint:script；
    ```js
    "scripts": {
      "lint:script": "eslint --ext .js,.jsx,.vue,.ts,.tsx --fix --quiet ./"
    }
    ```
  * 最后执行`pnpm run lint:script`就能看到一些不规范的地方，之后会做保存自动格式化；

### 10.2. 集成Prettier
  * ESLint 经常结合 Prettier 一起使用才能体现它们的能力，Prettier 主要是对代码做格式化，接下来实现将两者结合起来。安装：`pnpm add prettier -D -w`；
  * 新建文件`.prettierrc.cjs`，忽略文件`.prettierignore`：
    ```js
    // .prettierrc.cjs
    module.exports = {
      printWidth: 80, //一行的字符数，如果超过会进行换行，默认为80
      tabWidth: 2, // 一个 tab 代表几个空格数，默认为 2 个
      useTabs: false, //是否使用 tab 进行缩进，默认为false，表示用空格进行缩减
      singleQuote: true, // 字符串是否使用单引号，默认为 false，使用双引号
      semi: true, // 行尾是否使用分号，默认为true
      trailingComma: 'none', // 是否使用尾逗号
      bracketSpacing: true // 对象大括号直接是否有空格，默认为 true，效果：{ a: 1 }
    };

    // .prettierignore
    /packages/hope
    dist
    node_modules

    .eslintignore
    .eslintrc
    README.md
    ```
  * 安装 eslint-config-prettier(覆盖 eslint 本身规则)和 eslint-plugin-prettier(Prettier 来接管 eslint --fix 即修复代码的能力)：`pnpm add eslint-config-prettier eslint-plugin-prettier -D -w`；
  * 配置.eslintrc.cjs，新增的部分加了注释(注意配置完后将 VSCode 格式化文档默认选择 prettier)；
    ```js
    "extends": [
        ...

        // 1.接入 prettier 的规则
        "prettier",
        "plugin:prettier/recommended"
    ],
    "rules": {
        ...

        // 2. 开启 prettier 自动修复的功能
        "prettier/prettier": "error"
    }
    ```
  * 最后执行`pnpm run lint:script`即可完成 ESLint 规则校验检查以及 Prettier 的自动修复；
  * 通常希望在保存代码的时候编辑器就能给我们自动格式化修复，VSCode 就可以做到，只需要一个简单的配置即可，打开vscode设置搜索forma，Default Formatter选择Prettier-Code formatter（注意前提已经安装了Prettier - Code formatter插件要不然找不到），然后往下走勾选Format On Save选项，设置完后除了忽略文件的文件按ctrl+s就能自动格式化代码了；

### 10.3. 集成Stylelint
  * 给项目引入 Stylelint(样式规范工具)，安装：`pnpm add stylelint stylelint-prettier stylelint-config-standard stylelint-config-recommended-less postcss-html stylelint-config-recommended-vue stylelint-config-recess-order stylelint-config-prettier -D -w`；
  * 新建.stylelintrc.cjs文件：
    ```js
    module.exports = {
      // 注册 stylelint 的 prettier插件
      plugins: ["stylelint-prettier"],
      // 继承一系列规则集合
      extends: [
        // standard 规则集合
        "stylelint-config-standard",
        "stylelint-config-recommended-less",
        // 样式属性顺序规则
        "stylelint-config-recess-order",
        // 接入 Prettier 规则
        "stylelint-config-prettier",
        "stylelint-prettier/recommended"
      ],
      // 配置 rules
      rules: {
        // 开启 Prettier 自动格式化功能
        "prettier/prettier": true
      }
    };
    ```
  * 在 package.json 中新增 script 命令，执行`pnpm run lint:style`即可完成样式的格式化，同样的如果想要保存时自动格式化可以在 VSCode 安装 Stylelint 插件:
    ```js
    "lint:style": "stylelint --fix \"packages/components/src/**/*.{css,less}\""
    ```

## 十一、引入现代前端测试框架 Vitest
  * Vitest是个高性能的前端单元测试框架，它的用法其实和 Jest 差不多，但是它的性能要优于 Jest 不少，还提供了很好的 ESM 支持，同时对于使用 vite 作为构建工具的项目来说有一个好处就是可以公用同一个配置文件vite.config.js；
  * 因为测试的前端组件库是运行在浏览器上的，所以需要额外安装`happy-dom`，同时还需要安装展示测试覆盖率工具`c8`，安装：`pnpm add vitest happy-dom c8 -D -w`；

### 11.1. 配置
  * 上面提到过，Vitest 的配置可以直接在`vite.config.ts`中配置，所以来到components/vite.config.ts中对 Vitest 做一个相关配置(三斜线命令告诉编译器在编译过程中要引入的额外的文件)；
    ```js
    /// <reference types="vitest" />

    import { defineConfig } from "vite";
    import vue from "@vitejs/plugin-vue";

    import dts from "vite-plugin-dts";
    // @ts-ignore
    import DefineOptions from "unplugin-vue-define-options/vite";

    export default defineConfig({
      test: {
        environment: "happy-dom"
      },
      build: {...
    ```
  * 接着在`package.json`中增加两个命令`vitest`和`vitest run --coverage`，分别是进行单元测试和查看单元测试覆盖情况，此时便可以使用 Vitest 进行测试了；
    ```js
    "scripts": {
      ...,
      "test": "vitest",
      "coverage": "vitest run --coverage"
    },
    ```

### 11.2. 执行测试
  * 在执行test命令时，Vitest 会执行`**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`的文件，这里把测试文件统一命名为`**/*.{test}.ts`的形式，并放在每个组件的__tests__目录下；
  * 比如在 button 目录下新建__tests__/button.test.ts文件，然后写一个简单的测试代码看一下效果，然后在components目录下执行`pnpm run test`就可以看到测试通过了；
    ```js
    import { describe, expect, it } from "vitest";

    describe('hellohope', () => {
      it('should be hellohope', () => {
        expect('hello' + 'hope').toBe('hellohope')
      })
    })
    ```
  * 然后执行`pnpm run coverage`可以看到测试覆盖情况，其中每个字段代表的含义如下；
    - %stmts 是语句覆盖率（statement coverage）：是不是每个语句都执行了？
    - %Branch 分支覆盖率（branch coverage）：是不是每个 if 代码块都执行了？
    - %Funcs 函数覆盖率（function coverage）：是不是每个函数都调用了？
    - %Lines 行覆盖率（line coverage）：是不是每一行都执行了？

### 11.3. 测试组件
  * 上面只是简单测试了一个字符串相加，现在测试组件是否复合要求；
  * 因为项目是 vue 组件库，因此可以安装 Vue 推荐的测试库`pnpm add @vue/test-utils -D -w`；
  * 修改一下button.test.ts文件，来测试一下 Button 组件的 slot；
    ```js
    import { describe, expect, it } from "vitest";

    import { mount } from "@vue/test-utils";
    import button from "../button.vue";

    describe("test button", () => {
      it("should render slot", () => {
        const wrapper = mount(button, {
          slots: {
            default: "hope"
          }
        });

        expect(wrapper.text()).toContain('hope')
      })
    })
    ```
    - `@vue/test-utils`提供了一个`mount`方法，可以传入不同参数来测试组件是否复合预期。比如上面测试代码的含义是：传入 `button` 组件，并将其默认`slot`设置为`hope`，期望页面加载的时候文本会展示`hope`，很显然`button`组件是有这个功能的，所以执行`pnpm run test`的时候这条测试就通过了；
  * 如果还想测试`button`组件传入 type 展示某个样式的时候可以这样写：
    ```js
    ...

    it("should have class", () => {
      const wrapper = mount(button, {
        props: {
          type: "primary"
        }
      });

      expect(wrapper.classes()).toContain('h-button--primary')
    })
    ```
    - 这条测试的含义是：当传入的type为primary的时候，期望组件的类名为h-button--primary，很明显这条也是可以通过的，同时这时候会发现刚刚启动的测试自己自动更新了，说明Vitest是具有热更新功能的；

> 关于[@vue/test-utils](https://test-utils.vuejs.org/guide/)更多功能感兴趣的可以查看官方文档；