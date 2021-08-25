'use strict'

// tcp 관련 모듈 선언
const net = require('net');
const tcpClient = require('./Client');

// tcp 서버 클래스 생성
class tcpServer {
    // 생성자 (서버이름, 서버포트, 서버주소)
    constructor(name, port, urls) {
        // 서버 옵션
        this.context = {
            name: name,
            port: port,
            urls: urls
        }

        // 서버 저장소: merge{} 객체선언
        this.merge = {};

        // 소켓처리형 TCP서버 생성
        this.server = net.createServer((socket) => {
            // 클라이언트 접속 이벤트 처리
            this.onCreate(socket);
            
            // 에러 처리
            socket.on('error', (exception) => {
                this.onClose(socket);
            });

            // 데이터 수신 처리
            socket.on('data', (data) => {
                // 저장할 데이터의 키는 수신한 데이터의 (주소:포트) 형태로 저장
                var key = socket.remoteAddress + ":" + socket.remotePort;

                // 해당 this.merge[key]에 데이터가 존재하지 않는다면, 평범하게 data만 String형식으로 저장
                var sz = this.merge[key] ? this.merge[key] + data.toString() : data.toString();
                
                // 배열에 문단 구분 하여 데이터 저장
                var arr = sz.split('¶');
                
                // 데이터 검사
                for (var n in arr) {
                    // 문단기호가 없었다면, 단어로 판단하여 저장 후 종료  
                    if (sz.charAt(sz.length - 1) != '¶' && n == arr.length -1) {
                        this.merge[key] = arr[n];
                        break;
                    }

                    // 아무런 데이터가 없다면 그냥 종료
                    else if (arr[n] == "") {
                        break;
                    }

                    // 그 외에는 문단으로 판단하여 반복하여 데이터를 저장
                    else {
                        this.onRead(socket, JSON.parse(arr[n]));
                    }   
                }
            });
        });

        // 서버 객체 에러 처리
        this.server.on('error', (err) => {
            console.log(err);
        });

        // 서버 실행
        this.server.listen(port, () => {
            console.log('listen', this.server.address());
        });
    }

    // 접속 시도한 소켓에 대하여, 로그 출력
    onCreate(socket) {
        console.log("onCreate", socket.remoteAddress, socket.remotePort);
    }

    // 접속 종료한 소켓에 대하여, 로그 출력
    onClose(socket) {
        console.log("onClose", socket.remoteAddress, socket.remotePort);
    }


    // Distributor 접속 함수
    connectToDistributor(host, port, onNoti) {
        // Distributor에 전달할 패킷 정의
        var packet = {
            uri: "/distributes",
            method: "POST",
            key: 0,
            params: this.context
        };

        // Distributor 접속 상태
        var isConnectedDistributor = false;

        // Client 클래스 인스턴스 생성
        this.clientDistributor = new tcpClient(
            host,
            port,
            // 데이터 접속 이벤트
            (options) => {
                isConnectedDistributor = true;
                this.clientDistributor.write(packet);
            },

            // 데이터 수신 이벤트
            (options, data) => { onNoti(data); },

            // 접속 종료 이벤트
            (options) => { isConnectedDistributor = false },

            // 에러 이벤트
            (options) => { isConnectedDistributor = false }
        );

        // 주기적인 Distributor 접속 시도
        setInterval(() => { 
            if (isConnectedDistributor /= true) {
                this.clientDistributor.connect();
            }
        }, 3000);
    }

}

// tcpServer 객체 전역화
module.exports = tcpServer;

