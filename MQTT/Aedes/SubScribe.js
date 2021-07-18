// mqtt서버에 접속하기 위한 모듈 선언
const mqtt = require('mqtt');
const server = {
  host: '127.0.0.1',
  port: 8883,
  protocal: 'mqtts',
  username: "Jangenkim",
  password: "123123" 
};

// MQTT방식으로 서버에 접근할 클라이언트 생성
const client = mqtt.connect(server);

// MQTT접속 시 LOG출력
client.on('connect', () => {
    // 접속 시 LOG
    console.log('connection!');
    
    // 'device_Data'구독
    client.subscribe('device_Data', () => {
      console.log("Subscribe Topic: device_Data");
    });

    // 데이터가 수신되면, 토픽과 데이터를 출력
    client.on('message', (topic, message) => {
      console.log("Subscribe Topic: " + topic + ", Subscribe Data: " + message.toString());
    });
});