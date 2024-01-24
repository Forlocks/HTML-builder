const path = require('path');
const fs = require('fs');

function copyDir(dirName, dirCopyName) {
  fs.mkdir(dirCopyName, () => {
    fs.readdir(dirName, (error, files) => {
      files.forEach((item) => {
        fs.stat(path.join(dirName, item), (error, stats) => {
          if (stats.isDirectory()) {
            copyDir(path.join(dirName, item), path.join(dirCopyName, item));
          } else {
            fs.copyFile(path.join(dirName, item), path.join(dirCopyName, item), () => {});
          }
        });
      });
    });
  });
}

fs.mkdir(path.join(__dirname, 'project-dist'), () => {
  const indexFile = path.join(__dirname, 'project-dist', 'index.html');
  const styleFile = path.join(__dirname, 'project-dist', 'style.css');

  copyDir(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));

  fs.writeFile(indexFile, '', () => {
    const templateStream = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');

    let dataTemplate = '';

    templateStream.on('data', (chunk) => dataTemplate += chunk);
    templateStream.on('end', () => {
      fs.readdir(path.join(__dirname, 'components'), (error, files) => {
        const dataComponents = {};

        files.forEach((item, index) => {
          const componentStream = fs.createReadStream(path.join(__dirname, 'components', item));

          let dataComponent = '';

          componentStream.on('data', (chunk) => dataComponent += chunk);
          componentStream.on('end', () => {
            dataComponents[path.parse(path.join(__dirname, 'components', item)).name] = dataComponent;

            if (index === files.length - 1) {
              for (let i = 0; i < files.length; i++) {
                dataTemplate = dataTemplate.replace(/{{(.*?)}}/, (match, group) => {
                  return dataComponents[group] || match;
                });

                if (i + 1 === files.length) {
                  fs.appendFile(indexFile, dataTemplate, () => {});
                }
              }
            }
          });
        });
      });
    });
  });

  fs.writeFile(styleFile, '', () => {
    fs.readdir(path.join(__dirname, 'styles'), (error, files) => {
      files.forEach((item) => {
        const itemPath = path.join(__dirname, 'styles', item);

        fs.stat(itemPath, (error, stats) => {
          if (stats.isFile() && path.parse(itemPath).ext === '.css') {
            fs.createReadStream(itemPath, 'utf-8').on('data', (chunk) => {
              fs.appendFile(styleFile, chunk, () => {});
            });
          }
        });
      });
    });
  });
});