import { exec } from 'child_process';

function executeShellCmd(cmd) {
  return new Promise(function(resolve, _reject) {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
          return resolve(error.message);
      }
      if (stderr) {
          return resolve(stderr);
      }
      resolve(stdout);
    });
  })
}

export {executeShellCmd};