// 시리얼 포트를 위한 모듈 선언
const SerialPort = require('serialport');
const serialPort = new SerialPort("COM5",{baudRate:19200, autoOpen: true});
var serial_rx =  Buffer.allocUnsafe(9).fill(0);
var serial_rx_buff = Buffer.allocUnsafe(9).fill(0);
var serial_rx_idx = 0;
var crc = require("crc");

// 이 포트가 열렸을 때
serialPort.on('open', function() {
    console.log('Serial Server Start...');
});

// 이 포트에 에러가 발생했을 때
serialPort.on('error', function(err) {
    console.log('Error: ', err.message);
});

// 이 포트로 데이터가 왔을 때 
serialPort.on('data', function(data){

    // 응답받은 데이터를 HEX(16진수)로 저장
    hexData = data.toString('hex');
   
    // 응답받은 데이터의 비트가 18이상일 경우
    if(hexData.length >= 18) {
        // 응답 데이터 확인 (Hex, Buffer)
        console.log('| Get Data(Hex): ' + hexData + ', ' + true + ' |');
        console.log(data);

        // 버퍼 데이터의 각 요소 확인 후 
        for(var i=0; i<data.length; i++) {
            console.log('Buffer Data['+i+']: ' + data[i]);
            serial_rx_buff.writeUInt8(data[i], i);
        }
        console.log(serial_rx_buff);
        console.log('\n');
        
        // 버퍼데이터의 길이에 따른 반복문 시작
        for (var i=0; i < data.length; i++) {   
            // 각, Serial_rx_idx에 따른, 옳바른 값 비교 후 증감
            switch(serial_rx_idx)
            {
                case 0:
                if(serial_rx_buff[serial_rx_idx] == 0x01)
                    ++serial_rx_idx;
                break;
      
                case 1:
                if(serial_rx_buff[serial_rx_idx] == 0x04)
                    ++serial_rx_idx;
                break;
      
                case 2:
                if(serial_rx_buff[serial_rx_idx] == 0x04)
                    ++serial_rx_idx;
                break;
      
                case 3:
                case 4:
                case 5:
                case 6:
      
                case 7:
                ++serial_rx_idx;
                break;
                
                // CRC 테스트
                case 8:
                // CRC값 비교를 위한, 임시버퍼를 복사 
                var rx_temp = Buffer.allocUnsafe(7).fill(0);
                serial_rx_buff.copy(rx_temp, 0, 0, 7);
      
                // CRC버퍼를 생성하여, getData의 CRC값 저장
                var crcBuff = Buffer.allocUnsafe(2).fill(0);
                crcBuff.writeUInt16LE(crc.crc16modbus(rx_temp), 0);
                serial_rx_buff.copy(serial_rx, 0, 0, 9);
        
      
                // 오류체크
                if((serial_rx_buff[7] == crcBuff[0]) && (serial_rx_buff[8] == crcBuff[1])) {
                  serial_rx_buff.fill(0);
      
                  // 온습도 데이터 배열 선언
                  var modbus_data = new Array(2);
      
                  // 온도 데이터에 데이터 추가
                  modbus_data[0] = serial_rx[3]<<8 | serial_rx[4];
                  console.log("Temprature: " + (modbus_data[0]/100) + "℃");
      
                  // 습도 데이터에 데이터 추가
                  modbus_data[1] = serial_rx[5]<<8 | serial_rx[6];
                  console.log("Humidity: " + (modbus_data[1]/100)  + "%");
                  console.log('\n------------------------------------------------------\n');
                }
                else {
                    console.log("pasing fail");
                }
      
                serial_rx_idx = 0;
                break;
            }
        }
    }
    else {
        // 응답받은 데이터의 비트가 17이하일 경우
        console.log('\n------------------------------------------------------\n');
        console.log('| Get Data(Hex): ' + hexData + ', ' + false + ' |');
        console.log(data);
        console.log('\n------------------------------------------------------\n');
    }
});

// 디바이스 요청 주기
setInterval(function() {
    // 일반 버퍼 추가
	var commandBuff = Buffer.allocUnsafe(6).fill(0);
	commandBuff.writeUInt8(0x01, 0);
	commandBuff.writeUInt8(0x04, 1);
	commandBuff.writeUInt8(0x00, 2);
	commandBuff.writeUInt8(0x00, 3);
	commandBuff.writeUInt8(0x00, 4);
	commandBuff.writeUInt8(0x02, 5);

	// checksum 버퍼 추가
	var crcBuff = Buffer.allocUnsafe(2).fill(0);
	crcBuff.writeUInt16LE(crc.crc16modbus(commandBuff), 0);
	
    // 버퍼 데이터 통합
    var serial_tx = Buffer.concat([commandBuff, crcBuff], commandBuff.length + crcBuff.length);

    // 버퍼를 활용하여, 디바이스에 데이터 보내기(요청)
	serialPort.write(serial_tx,  function(err) {
		if(err) {
			console.log("Command Error: " + err);
		}
	});
}, 3000);

////////////////////////////////////////////////////////////////
// 권팀장님의 소스를 기반으로 하는 방법 ( Buffer위주 )

        /*  제일, 모범적인 방법   */

////////////////////////////////////////////////////////////////