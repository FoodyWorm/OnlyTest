// 서버 생성
const http = require('http');

var options = {
    host: "127.0.0.1",
    port: 8000,
    path: '/'
};

var server = http.createServer((req, res) => { 
    console.log("Running Server... ");
    res.end("hello world");
});

// 서버 실행
server.listen(8000);