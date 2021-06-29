// 시리얼 포트를 위한 모듈 선언
const SerialPort = require('serialport');
const port = new SerialPort("COM5",{baudRate:19200});

// 이 포트가 열렸을 때
port.on('open', function() {
    console.log('Serial Server Start...');
});

// 이 포트에 에러가 발생했을 때
port.on('error', function(err) {
    console.log('Error: ', err.message);
});

// 이 포트로 데이터가 왔을 때 
port.on('data', function(data){

    // 응답받은 데이터를 HEX(16진수)로 저장
    hexData = data.toString('hex');
    
    // 응답받은 데이터의 비트가 18이상일 경우에만 정상실행
    if(hexData.length >= 18) {
        console.log('| Get Data(Hex): ' + hexData + ', ' + true + ' |\n');

        // HEX DATA를 각 요소로 나누어 저장
        var changeHexData = hexData.split('');
        console.log('| Change Data(Hex)[]: ' + changeHexData  + '|');
        // console.log('| Change Data(Hex)[] Type: ' + typeof(changeHexData)  + '|');
        // console.log('| Change Data(Hex)[].length: ' + changeHexData.length + '|\n');


        // getData배열에 changeHexData를 HEX형식에 맞게 저장 
        
        var getData = [];
        for(var i=0; i<changeHexData.length; i+=2) {
            getData.push(changeHexData[i] + changeHexData[i+1]);
        }
        console.log('| Array Data: ' + getData + ' |\n');

        // 각 GetData를 할당할 변수 선언 및 할당
        var national_Number = "0x" + getData[0];
        var response_Command = "0x" + getData[1];
        var data_Number = "0x" + getData[2];
        var temperature_Data = "0x" + getData[3] + getData[4];
        var humidity_Data = "0x" + getData[5] + getData[6];
        var crc16 = "0x" + getData[7] + getData[8];

        console.log("National Number: " + national_Number);
        console.log("Response Command: " + response_Command);
        console.log("Data Number: " + data_Number);
        console.log("Temprature Data: " + (parseInt(temperature_Data) / 100) + "℃");
        console.log("Humidity_Data: " + (parseInt(humidity_Data) / 100  + "%"));
        console.log("CRC16: " + crc16);

    }
    else {
        console.log('| Get Data(Hex): ' + hexData  + ', ' + false + ' |\n');
    }
});

// THD 디바이스 요청 주기
setInterval(function() {
    // THD 디바이스에 요청할 데이터
    var sendData = [0x01, 0x04, 0x00, 0x00, 0x00, 0x02, 0x71, 0xCB];
    port.write(sendData);
    console.log('\n------------------------------------------------------');
    console.log('| Send Data: ' + sendData + " |");

}, 3000);

////////////////////////////////////////////////////////////////

        /*   Hexadecimal을 Decimal로 변환하는 방법   */

////////////////////////////////////////////////////////////////
