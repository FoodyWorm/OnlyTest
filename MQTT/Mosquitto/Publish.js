// mqtt서버를 활용하기 위한 모듈을 선언
const mqtt = require('mqtt');

// 토픽발행함수 생성
function publish() {
  // mqtt - mosquitto공식서버에 접속하여 임의변수 device에 연결
  var device = mqtt.connect('mqtt://test.mosquitto.org');

  // 디바이스가 서버 접속에 성공하면, "Device Connection!" 출력
  device.on('connect', () => { 
    console.log("Device Connection!");

    // 'device_Data'(Topic)를 구독한 클라이언트에게 "d_Data"전송 후 LOG출력
    device.publish('device_Data', "d_Data", () => {
      console.log("Publish Topic: device_Data, " + "Publish Data: d_Data");
    });
  });
}

// 1초마다 publish(토픽발행)함수를 실행
setInterval(publish, 1000);

