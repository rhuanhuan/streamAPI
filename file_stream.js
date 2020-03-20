var http = require('http');
var fs = require('fs');
var path = require('path');

var readFile = path.resolve(__dirname, 'data.txt');
var writeFile = path.resolve(__dirname, 'data-write.txt');


let copyNormally = () => fs.readFile(readFile, (err, data) => {
    if (err) {
        console.log(err.message);
        return
    }

    var readData = data.toString();

    fs.writeFile(writeFile, readData, (err) => {
        if (err) {
            console.log(err.message);
        }
        console.log('Normally 写入完成');
    });
});

let copyWithStream = () => {
    var readStream = fs.createReadStream(readFile);
    var writeStream = fs.createWriteStream(writeFile);

    readStream.pipe(writeStream);

    readStream.on('end', () => console.log('Stream 拷贝完成'))
};
copyNormally();

copyWithStream();
