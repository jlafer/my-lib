//TODO this should probably move to jlafer-node-util

import {readTextFile, writeToTextFile} from 'jlafer-node-util';

const copyTextFile = (indir, outdir, filename) => {
  const inPath = `${indir}/${filename}`;
  const outPath = `${outdir}/${filename}`;
  readTextFile(inPath)
  .then((data) => {
    //console.log(`data read from ${inPath}`);
    writeToTextFile(outPath, data)
  })
};

function checkDirExists(path) {
  return new Promise(function(resolve, _reject) {
    fs.stat(
      path,
      function(err, stats) {
        if (err)
          resolve(false);
        resolve(true);
      }
    );
  });
}

export {copyTextFile, checkDirExists};