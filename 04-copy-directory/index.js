const path = require('path');
const fs = require('fs');

const dirName = path.join(__dirname, 'files');
const dirCopyName = path.join(__dirname, 'files-copy');

function copyDir() {
  fs.mkdir(dirCopyName, () => {
    fs.readdir(dirName, (error, files) => {
      files.forEach((item) => {
        fs.copyFile(path.join(dirName, item), path.join(dirCopyName, item), () => {});
      });
    });
  });
}

copyDir();