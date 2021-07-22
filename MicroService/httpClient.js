// 서버 옵션
var http = require('http');

var options = {
    host: "127.0.0.1",
    port: 8000,
    path: '/'
};

// 서버에 'http://127.0.0.1:8000'에 요청
var req = http.request(options, (res) => {
    var data = "";
    // 요청 실행 후 응답받은 데이터
    res.on('data', (chunk) => {
        data += chunk;
    });

    // 요청 종료 후 로그 출력
    res.on('end', () => {
        console.log(data);
    });    
});

// 요청 종료
req.end();
// console.log(req);