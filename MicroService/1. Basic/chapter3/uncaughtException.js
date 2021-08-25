// 메인 프로세스
function func(callback) {
    process.nextTick(callback, "callback!");
    callback();
    // console.log("test");
}

// 프로세스 실행 및 일반 예외 처리
try {
    func((param) => {
        a.a =0;``
    });
} catch (e) {
    console.log("exception!!!");
}

// 모든 스레드의 예외 처리
process.on("uncaughtException", (error) => {
    console.log("uncaughtException!!");
})