// 서버생성
var net = require('net');
var options = {
    port: 9000,
    host: "127.0.0.1"
}

// 서버 연결시도 후 로그출력
var client = net.connect(options, () => {
    console.log('connected');
});

// 서버 연결 성공시 로그 출력
client.on('connect', () => {
    console.log('Success')
});

// 서버 연결 에러 발생시 로그 출력
client.on('error', (err) => {
    console.log("---------------- Error -------------\n" + err);
});

// 서버 종료시 로그 출력
client.on('end', () => {
    console.log('disconnected');
});




