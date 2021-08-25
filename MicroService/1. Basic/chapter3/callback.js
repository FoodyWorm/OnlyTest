// 메인 프로세스
function func(callback) {
    callback("Change Data");
}

// 하위 프로세스
function testFunc(data) {
    console.log(data);
}

// 프로세스 실행
func(testFunc);