// 서버를 위한 PORT와 HOST그리고 모듈을 저장
let PORT = 5050;
let HOST = '127.0.0.1';
let tcp = require('net');

// net모듈을 활용한 TCP서버 제작
var server = tcp.createServer(function(socket) {
    // Socket Log
    console.log('- Client connection -\n');
    console.log('Client local_Adress: ' + socket.localAddress + 'Client local_Port: ' + socket.localPort);
    console.log('Client remote_Address: ' + socket.remoteAddress + 'Client remote_Port: ' + socket.remotePort);
    
    // Socket Option
    socket.setTimeout(500);
    socket.setEncoding('utf8');
    
    // Socket Data
    socket.on('data', function(data) {
        console.log('Received Data: ' + data.toString());
        socket.write(data);
        console.log('Client.bytesWritten: ' + socket.bytesWritten);
    });
    
    // Socket End
    socket.on('end', function() {
        console.log('Client Disconnected');
    });

    // Socket Error
    socket.on('error', function(err) { 
        console.log('Socket Error: ' +  err);
    });

    // Socket Timeout
    socket.on('timeout', function() {
        console.log('Socket Timed out');
    })
});

// TCP서버 활성화
server.listen(PORT, HOST, function() {
   // Server Log
   console.log('Server Listen... Address: https://' + HOST + ':' + PORT);
   
   // Server Close
   server.on('close', function() {
       console.log('Server Close...');
   })
   
   // Server Error
   server.on('error', function(err) {
        console.log('Server Error: ' + err);
   });
});

