// 서버생성
var net = require('net');
var server = net.createServer(SocketEnd);

// 서버 응답 함수
function SocketEnd() {
    socket.end('heelo world');
}

// 서버 에러 로그
server.on('error', (err) => {
    if(err) { throw err }
})

// 서버 실행
server.listen(9000, () => {
    console.log('listen', server.address());
})
