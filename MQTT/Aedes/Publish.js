// mqtt서버에 접속하기 위한 모듈 선언
const mqtt = require('mqtt');

// 접속할 서버 옵션
const server = {
  host: '127.0.0.1',
  port: 8883,
  protocal: 'mqtts',
  username: "Jangenkim",
  password: "123123" 
};

// 토픽발행함수 생성
function publish() {
    // mqtt형식으로 서버에 접속
    const device = mqtt.connect(server);

    // 디바이스가 서버에 접속하면 LOG출력
    device.on('connect', () => {
      // 접속 LOG
      console.log('connection!');
      
      // 디바이스 발행(응답) - 'device_Data'구독자들에게 'd_Data'전송 
      device.publish('device_Data', 'd_Data', () => {
        console.log("Publish Topic: device_Data, " + "Publish Data: d_Data");
      });
    });
}

// 1초마다 publish(토픽발행)함수를 실행
setInterval(publish, 5000);
