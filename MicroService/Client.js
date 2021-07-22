// Strict모드 사용
'use strict';

const { write } = require('fs');
// TCP모듈 선언
const net = require('net');

// TCP클라이언트 객체 클래스 제작
class tcpClient {
    // 생정자 (호스트 주소 / 포트번호 / 접속 정보 / 데이터 수신 / 접속 종료 / 에러코드 )
    constructor(host, port, onCreate, onRead, onEnd, onError) {
        this.options = {
            host: host,
            port: port
        };
        this.onCreate = onCreate;
        this.onRead = onRead;
        this.onEnd = onEnd;
        this.onError = onError;
    }

    // 접속 처리 함수
    connect() {
        // TCP 접속
        this.client = net.connect(this.options, () => {
            if (this.onCreate) this.onCreate(this.options);
        });

        // 데이터 수신 처리 함수
        this.client.on('data', (data) => {
            // sz: String Zero -> 데이터를 스트링 형식으로 저장
            var sz = this.merge ? this.merge + data.toString() : data.toString(); 
            
            // '¶'(Pillcrow): 문단구분기호 -> 가져온 데이터에 문단기호를 기준으로 배열에 차례대로 저장
            var arr = sz.split('¶')

            // 데이터 정규식 및 수신 처리
            for (var n in arr) {
                // 문단 기호가 없다면, this.merge에 저장 하고 종료 (문단기호가 없다면, 간단한 단어이기 때문)
                if (sz.charAt(sz.length - 1) != '¶' && n == arr.length -1) {
                    this.merge = arr[n];
                    break;

                // 수신 데이터가 비어있다면 (쓸 모 없으니까) -> break;
                } else if (arr[n] == "") {
                    break;

                // 위 2가지에 모두 해당되지 않는다면, 큰 데이터이기 때문에 바로, onRead함수로 데이터 수신처리
                } else {
                    this.onRead(this.options, JSON.parse(arr[n]));
                }
            }
            
            // 에러처리
            this.client.on('error', (err) => {
                if (this.onError) {
                    this.onError(this.options, err);
                }
            })
            
        });
    }

    // 데이터 송신 처리 함수
    write(packet) {
        this.client.write(JSON.stringify(packet) + '¶'); 
    }
      
}

// 클래스 전역화
module.exports = tcpClient;










// 아래는 이해를 위한 테스트 함수 입니다.
// 클래스와 생성자 내부에서는 변수를 선언하지 않고도 this.text = 1; 이런 형식으로 사용할 수 있다.
class test {
    // 생성자 (test1, test2)
    constructor(test1, test2) {
        // 이렇게 this.test1로 생성하게된 변수는 '자동'으로 '지역변수'로 할당된다.
        this.test1 = test1;
        this.test2 = test2;
    }

    // 로그 출력하는 테스트 함수
    test() {
        console.log("test");
    }
}

// test 객체 생성 및 테스트
var Box = new test(1, 2);
console.log("Box.test1: " + Box.test1);
console.log("Box.test2: " + Box.test2);
Box.test();
