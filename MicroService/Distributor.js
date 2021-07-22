// map객체 생성
var map = {};

// 디스트리뷰터 객체 생성
class distributor extends require('./Server') {
    // 생성자 ()
    constuctor() {
        // Server 클래스 생성자 호출
        super("distibutor", 9000, ["POST/distributes", "GET/distributes"]);
    }

    // 노드 접속 이벤트 처리
    onCreate(socket) { 
        console.log("onCreate", socket.remoteAddress, socket.remotePort);
        this.sendInfo(socket);
    }

    // 접속 해제 이벤트 처리
    onClose(socket) {
       var key = socket.remoteAddress + ":" + socket.remotePort;
       console.log("onClose", socket.remoteAddress, socket.remotePort);
       delete map[key];
       this.sendInfo(); 
    }

    // 패킷 전송
    write(socket, packet) {
        socket.write(JSON.stringify(packet) + '¶');
    }

    // 접속 노드 혹은 특정 소켓에 접속 노드 정보 전파
    sendInfo(socket) {
        // 패킷정보
        var packet = {
            uri: "/distributes",
            method: "GET",
            key: 0,
            params: []
        };
        
        // 패킷 저장
        for (var n in map) {
            packet.params.push(map[n].info);
        }

        if (socket) {
            this.write(socket, packet);
        }
        else {
            for (var n in map) {
                this.write(map[n].socket, packet);
            }
        }
    }
}

// distributor 객체 생성
new distributor();