import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";
import prompts from "prompts";

import { readFile } from "fs/promises";

import gitClone from "./utils/gitClone.js";

// 读取文件
const pkg = JSON.parse(
  await readFile(new URL("./package.json", import.meta.url))
);

// 配置命令参数
const optionDefinitions = [
  { name: "version", alias: "v", type: Boolean },
  { name: "help", alias: "h", type: Boolean }
];
const options = commandLineArgs(optionDefinitions);

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

// 添加预设选项
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
const getUserInfo = async () => {
  const res = await prompts(promptsOptions);
  if (!res.name || !res.template) return;
  
  const remoteList = {
    1: "https://github.com/one-season/hope.git",
    2: "https://gitee.com/geeksdidi/kittyui.git"
  };
  gitClone(`direct:${remoteList[res.template]}`, res.name, { clone: true });
};

// 最终执行
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
