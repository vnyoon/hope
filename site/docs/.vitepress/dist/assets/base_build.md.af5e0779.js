import{_ as e,c as a,o,O as t}from"./chunks/framework.bf997157.js";const b=JSON.parse('{"title":"组件打包与发布","description":"","frontmatter":{},"headers":[],"relativePath":"base/build.md"}'),c={name:"base/build.md"},r=t('<h1 id="组件打包与发布" tabindex="-1">组件打包与发布 <a class="header-anchor" href="#组件打包与发布" aria-label="Permalink to &quot;组件打包与发布&quot;">​</a></h1><br><br><h2 id="打包" tabindex="-1">打包 <a class="header-anchor" href="#打包" aria-label="Permalink to &quot;打包&quot;">​</a></h2><ul><li>执行<code>pnpm run build:hope</code>即可完成打包，打包后的文件在目录<code>packages/hope</code>。当然如果想修改命令脚本的话，可以在根目录的package.json文件中的 script 字段中修改；</li></ul><h2 id="发布" tabindex="-1">发布 <a class="header-anchor" href="#发布" aria-label="Permalink to &quot;发布&quot;">​</a></h2><ul><li>发布之前你需要将项目关联一个 git 仓库，并且提交所有修改后执行<code>pnpm run publish:hope</code>，此时会有一些提示如选择如何提升版本，是否发布，是否加个 tag 等等；</li><li>当然，如果没有登录 npm 的话，会先让你登录 npm。</li></ul><blockquote><p>注意发布之前要将<code>packages/hope</code>下 package.json文件中 name 字段改成自己组件库的名字；</p></blockquote>',8),i=[r];function l(n,s,d,p,_,h){return o(),a("div",null,i)}const m=e(c,[["render",l]]);export{b as __pageData,m as default};