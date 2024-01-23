const fs = require('fs');

const { stdout } = process;

const readableStream = fs.createReadStream('01-read-file/text.txt', 'utf-8');

let data = '';

readableStream.on('data', (chunk) => data += chunk);
readableStream.on('end', () => stdout.write(data));