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
    console.log(data.toString());

    var readData = data.toString();

    fs.writeFile(writeFile, readData, (err) => {
        if (err) {
            console.log(err.message);

        }
        console.log('写入完成');
    });
});

copyNormally();
