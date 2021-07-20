// HTTP서버를 위한 HTTP모듈 선언
const http = require('http');

// 서버 포트번호: 3000
const port = 3000;

// 
const requestHandler = (request, response) => {
  console.log("Request URL: " + request.url);
  response.end('Hello Node.js Server!');
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) { throw err }
  console.log('Server is listening on http://localhost:3000/');
});


// 명령어: ps로 프로세스의 생성 여부를 확인

