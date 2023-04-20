import download from "download-git-repo";
import chalk from "chalk";
import ora from "ora";

export default (remote, name, option) => {
  const downSpinner = ora("正在下载模板...").start();
  
  return new Promise((resolve, reject) => {
    
    download(remote, name, option, err => {
      if (err) {
        downSpinner.fail(chalk.red("下载模板失败！"));
        console.log(chalk.red(err));
        
        reject(err);
        return;
      }

      downSpinner.succeed(chalk.green("模板下载成功！\r\n"));
      console.log(chalk.green(`cd ${name}\r\n`));
      console.log(chalk.blue(`pnpm install\r\n`));
      console.log('pnpm run hope:dev\r\n');
      console.log('pnpm run build:hope\r\n');

      resolve();
    });

  })
};