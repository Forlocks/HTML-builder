const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, 'secret-folder'), (error, files) => {
  files.forEach((item) => {
    const fullPath = path.join(__dirname, 'secret-folder', item);

    fs.stat(fullPath, (error, stats) => {
      if (stats.isFile()) {
        console.log([path.parse(fullPath).name, path.parse(fullPath).ext.slice(1), (+stats.size / 1000).toString() + 'kb'].join(' - ') );
      }
    });
  });
});