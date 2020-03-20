var http = require('http');
var fs = require('fs');
var path = require('path');

var fileName = path.resolve(__dirname, 'data.txt');

let normalRead = function (res) {
    fs.readFile(fileName, function (err, data) {
        res.end(data);
    });
};

let streamRead = function (req, res) {
    switch (req.method) {
        case 'GET': // 处理 GET 方法
            const stream = fs.createReadStream(fileName);

            var length = 0;
            stream.on('data', (chunk) => {
                length += chunk.toString().length;
                // check chunk style and print
                console.log(chunk instanceof Buffer);
                console.log(chunk)
            });
            stream.on('end', () => {
                console.log('chunk end');
                console.log(length)
            });

            stream.pipe(res);
            break;

        case 'POST': // 处理 POST 方法
            let len = 0;
            req.on('data', (chunk) => {
                len += chunk.toString().length;
                console.log('chunk ', len);
            });
            req.on('end', () => {
                console.log('chunk end');
                res.end(len+'')
            });
            break;
        default:
            res.end('method not support')
    }
};

var server = http.createServer((req, res) => {
    streamRead(req, res);
});

server.listen(8000, () => console.log("listen on 8000"));
