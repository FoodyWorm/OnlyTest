// mqtt - aedes서버를 위한 모듈을 선언
const require_aedes = require('aedes');
const aedes = require_aedes();

// net(TCP/IP)접속 형식에 MQTT-Aedes를 지원하는 서버를 생성
const server = require('net').createServer(aedes.handle);


// 서버에 접속하는 노드(client, device)를 LOG로 출력
server.on('connection', (client) => {
  console.log("Client Adress: " + client.address().address);
  console.log("Client: " + client);
  //client.pipe("Response 200");
});

// 서버에 생긴 ERROR를 LOG로 출력
server.on('error', (err) => {
  console.log("Error 발생 => " + err);
});

// 서버가 종료되면 LOG로 출력
server.on('close', () => {
  console.log("서버가 종료되었습니다.");
})

// 서버를 기본 로컬호스트 옵션(생략)으로 8883 포트로 실행.
server.listen(8883, () => {
  console.log("Server Running...");
});

// 서버에 발행(publish)된 토픽(Topic)이 존재하면, 비동기적으로 함수를 실행하여 LOG를 출력
server.on('publish', async (packet, client) => { 
  console.log("Client Id: " + client.id + ", Published Data: " + packet.payload.toString() + ", Published Topic: " + packet.topic);
});

// 서버에 구독(subscribe)된 토픽(Topic)이 존재하면, 동기적으로 함수를 실행하여 LOG를 출력
server.on('subscribe', (subscriptions, device) => {
  console.log("Device Id: " + device.id);
  console.log("subscriptions: " + subscriptions);
  console.log("Device Data: " + subscriptions.map(data => data.topic));
});

// 서버에 전달된 데이터를 (토픽 + 데이터) 형식으로 LOG출력
server.on('message', (topic, message) => {
  console.log("Topic: " + topic + ", Data: " + message.toString());
});