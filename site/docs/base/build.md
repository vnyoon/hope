# 组件打包与发布

<br />
<br />

## 打包
  * 执行`pnpm run build:hope`即可完成打包，打包后的文件在目录`packages/hope`。当然如果想修改命令脚本的话，可以在根目录的package.json文件中的 script 字段中修改；

## 发布
  * 发布之前你需要将项目关联一个 git 仓库，并且提交所有修改后执行`pnpm run publish:hope`，此时会有一些提示如选择如何提升版本，是否发布，是否加个 tag 等等；
  * 当然，如果没有登录 npm 的话，会先让你登录 npm。

> 注意发布之前要将`packages/hope`下 package.json文件中 name 字段改成自己组件库的名字；
