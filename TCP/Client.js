// 서버 접속을 위해서 PORT와 HOST그리고 모듈을 저장
let PORT = 5050;
let HOST = '127.0.0.1';
let tcp = require('net');

// 서버 접속 함수 생성
function getConnection() {
    // 클라이언트, 데이터, 포트, 주소 생성
    var client = "";
    var recvData = [];
    var local_port = "";
    var local_host = "";


    // 서버에 접속함과 동시에 관련 정보를 client에 저장
    client = tcp.connect({port: PORT, host: HOST}, function() {
        console.log("Connect Server");
        console.log("my_local_Address: " + this.localAddress + ", my_local_Port: " + this.localPort);
        console.log("my_remote_Address: " + this.remoteAddress + ", my_remote_Port: " + this.remotePort);

        local_port = this.localPort;
        local_host = this.localAddress;

        // 데이터 옵션 설정
        this.setEncoding('utf8');
        this.setTimeout(600000);
        console.log("Client Setting Encoding:binary, timeourt: 600,000");
        console.log("Client connect localport: " + local_port);
        console.log("Client connect localhost: " + local_host);
    });

    // 접속 종료 시 처리 
    client.on('close', function() { 
        console.log("client Socket Closed : " + " localport : " + local_port); 
    }); 
 
    // 데이터 수신 후 처리 
    client.on('data', function(data) { 
        console.log("data recv log======================================================================"); 
        recvData.push(data); 
        console.log("data.length : " + data.length);
        console.log("data recv : " + data);
        client.end();
    }); 
 
    // 데이터 접속종료 후
    client.on('end', function() { 
        console.log('client Socket End'); 
    }); 
     
    // 데이터 에러
    client.on('error', function(err) { 
        console.log('client Socket Error: '+ JSON.stringify(err)); 
    }); 
     
    // 데이터 시간초과
    client.on('timeout', function() { 
        console.log('client Socket timeout: '); 
    }); 
     
    // 데이터가 빠졌을 때
    client.on('drain', function() { 
        console.log('client Socket drain: '); 
    }); 
     
    // 데이터를 찾을 때
    client.on('lookup', function() { 
        console.log('client Socket lookup: '); 
    });  
    return client;

}

// 데이터 송신
function writeData(socket, data){
    var success = !socket.write(data);
    if (!success){
        console.log("Server Send Fail");
    }
  }
   
// 데이터 수신
var client = getConnection();
writeData(client, "에코 서버 테스트입니다.");
