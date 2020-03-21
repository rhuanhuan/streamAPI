var http = require('http');
var fs = require('fs');
var path = require('path');
var memeye = require('memeye');
var readline = require('readline');
memeye();

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

let copyWithStreamInline = () => {
    var readStream = fs.createReadStream(readFile);
    var writeStream = fs.createWriteStream(writeFile);

    const rl = readline.createInterface({
        input: readStream,
        output: writeStream
    });

    rl.on('line', (lineData) => { // 按行读取事件
        console.log(lineData);
        console.log('----this line read----');
    });
    rl.on('close', () => { // 按行读取结束
        console.log('readline end')
    });
};

setTimeout(() => {
    for (i=0; i<100; i++){
        console.log(i);
        copyWithStreamInline()
    }
}, 5000);

// copyNormally();

// copyWithStream();
