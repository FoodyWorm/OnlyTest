// mqtt서버를 활용하기 위한 모듈을 선언
const mqtt = require('mqtt');

// mqtt - mosquitto공식서버에 접속하여 임의변수 client에 연결
var client = mqtt.connect('mqtt://test.mosquitto.org');

// 클라이언트가 서버 접속에 성공하면, "Client Connection!" 출력
client.on('connect', () => {
  console.log("Client Connection!");

  // 현재, 클라이언트 (Topic)구독상태 -> 'device_Data'에 해당되면, LOG출력
  client.subscribe('device_Data', () => {
    console.log("Client Topic: " + "device_Data");
  });
});

// 받은 데이터가 존재하면, topic, data, packet을 LOG로 출력
client.on('message', (topic, data, packet) => {
  console.log("Topic: " + topic + ", Data: " + data + ", Packet: " + packet.payload);
});

