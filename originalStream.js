let Readable = require('stream').Readable;
let Writeable = require('stream').Writable;

let rs = new Readable;
let ws = Writeable();

ws._write = (chunk, enc, next) => {
    console.log(chunk.toString(), ' --');
    next();
};

rs.push('my ');
rs.push('nodejs ');
rs.push('stream.');
rs.push(null);

rs.pipe(ws);
