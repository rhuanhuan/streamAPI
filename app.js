var http = require('http');
var fs = require('fs');
var path = require('path');

let normalRead = function (res) {
    fs.readFile(fileName, function (err, data) {
        res.end(data);
    });
};

let streamRead = function (fileName, res) {
    var stream = fs.createReadStream(fileName);
    stream.pipe(res);
};

var server = http.createServer(function (req, res) {
    var fileName = path.resolve(__dirname, 'data.txt');
    streamRead(fileName, res);
});

console.log("listen on 8000");
server.listen(8000);
