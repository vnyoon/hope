# hope
  * 基于Vite4+TypeScript的Vue3组件库开发框架
  * hope是一个 Vue3 组件库开发环境框架，采用最新的 Vite4+TypeScript 为技术栈，支持按需加载、单元测试、自动打包与发布等功能，让我们能更专注于业务组件的开发。


## Monorepo项目搭建
  * Monorepo：就是一个代码库里包含很多的项目，而这些项目虽然是相关联的，但是在逻辑上是独立的，可以由不同人或者团队来维护；
  
## pnpm初始化项目
  * pnpm 对于包的管理是很方便的，尤其是对于一个 Monorepo 的项目。因为对于我们即将开发的组件库来说可能会存在多个 package(包)，而这些包在我们本地是需要相互关联测试的，刚好 pnpm 就对其天然的支持。其实像其它包管理工具，比如 yarn、lerna 等也能做到，但是相对来说比较繁琐。而 pnpm 现在已经很成熟了，像 Vant，ElementUI 这些明星组件库都在使用 pnpm，因此本项目也采用 pnpm 作为包管理工具。

  #### 安装
    * npm i pnpm -g

  #### 初始化
    * 在项目根目录执行 pnpm init，会自动生成package.json文件；
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

