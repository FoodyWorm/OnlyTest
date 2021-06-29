// 시리얼 포트를 위한 모듈 선언
const SerialPort = require('serialport');
const { encode, decode } = require('hex-encode-decode');
var crc = require("crc");
const serialPort = new SerialPort("COM5",{baudRate:19200});

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


        // 버퍼 데이터의 각 요소 확인
        for(var i=0; i<data.length; i++) {
            console.log('Buffer Data['+i+']: ' + data[i]);
        }
        console.log('\n');


        // 각 응답 데이터를 분류할 변수 선언
        var national_Number = data[0];
        var response_Command = data[1];
        var data_Number = data[2];
        
        var humidity_Data = data[5] + data[6];
        var crc16 = data[7] + data[8];
        
        var temperature_Data = data[4];//data[3]; //+ data[4];
        console.log(temperature_Data);

        console.log(temperature_Data.toString());
        temperature_Data = temperature_Data.toString();
        console.log(typeof(temperature_Data));

        console.log(encode(temperature_Data));
        temperature_Data = encode(temperature_Data);


        // 버퍼 데이터를 분류하기 위해 ASCII코드로 Encoding
        // ( Hex Encode, Decode )
        var encode_ASCII = encode('0104');
        console.log("Encode_ASCII: " + encode_ASCII);

        var decode_ASCII = decode(encode_ASCII);
        console.log("Decode_ASCII: " + decode_ASCII);
        
        

        

    }
    else {
        // 응답받은 데이터의 비트가 17이하일 경우
        console.log('| Get Data(Hex): ' + hexData + ', ' + false + ' |');
        console.log(data);
        console.log('\n');
    }
});

// 디바이스 요청 주기
setInterval(function() {
    // 일반 버퍼 추가
	var commandBuff = new Buffer(6);
	commandBuff.writeUInt8(0x01, 0);
	commandBuff.writeUInt8(0x04, 1);
	commandBuff.writeUInt8(0x00, 2);
	commandBuff.writeUInt8(0x00, 3);
	commandBuff.writeUInt8(0x00, 4);
	commandBuff.writeUInt8(0x02, 5);

	// checksum 버퍼 추가
	var crcBuff = new Buffer(2);
	crcBuff.writeUInt16LE(crc.crc16modbus(commandBuff), 0);
	
    // 버퍼 데이터 통합
    var serial_tx = Buffer.concat([commandBuff, crcBuff], commandBuff.length + 2);

    // 버퍼를 활용하여, 디바이스에 데이터 보내기(요청)
	serialPort.write(serial_tx,  function(err) {
		if(err) {
			console.log("Command Error: " + err);
		}
	});
}, 1000);

////////////////////////////////////////////// 
// ASCII(encode, decode)를 활용한 방법은... 
// 가능할 순 있어도, 매우 복잡하고 비효율적일 것...

            /*   불가능한 방법    */

//////////////////////////////////////////////