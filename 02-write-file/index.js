const { stdin, stdout } = process;
stdin.setEncoding('utf8');

const fs = require('fs');

const output = fs.createWriteStream('02-write-file/text.txt', 'utf-8');

stdout.write('Enter text\n');

stdin.on('data', (data) => {
  if (data.trim().toLowerCase() === 'exit') {
    stdout.write('Entry completed');
    process.exit();
  }

  output.write(data);
});

process.on('SIGINT', () => {
  stdout.write('Entry completed');
  process.exit();
});