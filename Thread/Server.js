// HTTP서버를 위한 HTTP모듈 선언
const http = require('http');

// 서버 포트번호: 3000
const port = 3000;

// 서버옵션 - 즉시실행요청함수
const requestHandler = (request, response) => {
  console.log("Request URL: " + request.url);
  response.end('Hello Node.js Server!');
}

// 서버 생성
const server = http.createServer(requestHandler);

// 서버 실행
server.listen(port, (err) => {
  if (err) { throw err }
  console.log('Server is listening on http://localhost:3000/');
});


// 명령어: ps로 프로세스의 생성 여부를 확인

