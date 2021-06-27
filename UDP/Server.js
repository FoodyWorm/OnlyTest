let PORT = 12000;
let HOST = '127.0.0.1';

let dgram = require('dgram');
let server = dgram.createSocket('udp4');

server.on('listening', function () {
    let address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port + ' - ' + message + '\n');
})

server.bind(PORT, HOST);
