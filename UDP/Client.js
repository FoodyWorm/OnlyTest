let PORT = 12000;
let HOST = '127.0.0.1';

let dgram = require('dgram');
let message = new Buffer('hellow world');

let client = dgram.createSocket('udp4');
client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    if (err) { throw err; }
    console.log('UDP message sent to ' + HOST + ':' + PORT);
    client.close();
})