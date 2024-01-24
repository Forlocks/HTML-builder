const path = require('path');
const fs = require('fs');

const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

fs.writeFile(bundlePath, '', () => {
  fs.readdir(path.join(__dirname, 'styles'), (error, files) => {
    files.forEach((item) => {
      const itemPath = path.join(__dirname, 'styles', item);

      fs.stat(itemPath, (error, stats) => {
        if (stats.isFile() && path.parse(itemPath).ext === '.css') {
          fs.createReadStream(itemPath, 'utf-8').on('data', (chunk) => {
            fs.appendFile(bundlePath, chunk, () => {});
          });
        }
      });
    });
  });
});