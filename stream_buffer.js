let str = "this is a test str";
let buffer = Buffer.from(str, 'utf-8');

console.log(buffer);
console.log(buffer.toString());

// test buffer performance
//

var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer((req, res) => {
    let filename = path.resolve(__dirname, 'buffer-test.txt');
    fs.readFile(filename, (err, data) => res.end(data)); // this is buffer
    // fs.readFile(filename, (err, data) => res.end(data.toString())); // this is string
});

server.listen(8888, () => console.log('server start on 8888'));
