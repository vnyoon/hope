import { spawn } from "child_process";

import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

/**
 * 文件url转文件路径：
 * file:///D:/_my_code/hope/site/script/deploy.js -> D:\_my_code\hope\site\script\deploy.js
 * 
 */
const __filename = fileURLToPath(import.meta.url);

/**
 * 获取文件路径目录路径：
 * D:\_my_code\hope\site\script\deploy.js -> D:\_my_code\hope\site\script
 */
const __dirname = dirname(__filename);

const run  = async (command, path) => {
  // cmd表示命令，args代表参数，如 rm -rf rm就是命令，-rf就为参数；
  const [cmd, ...args] = command.split(' ');

  return new Promise((resolve, reject) => {
    const app = spawn(cmd, args, {
      cwd: path, //执行命令的路径
      stdio: 'inherit', //输出共享给父进程
      shell: true //mac不需要开启，windows下git base需要开启支持
    });
    
    // 执行完毕关闭并resolve
    app.on('close', resolve)
  })
};
/**
 * 获取目录路径的上层目录，并运行上层目录下的deploy.sh文件：
 * D:\_my_code\hope\site\script -> D:\_my_code\hope\site
 */
run('deploy.sh', resolve(__dirname, '../'));