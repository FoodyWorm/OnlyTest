// 메인 프로세스
function func(callback) {
    // nextTick을 사용해 인자 값으로 전달된 callback 함수 호출
    process.nextTick(callback, "callback");
    // callback();
    console.log("test");
}

// 하위 프로세스 - 고의적 에러 함수
function serve() {
   a.a = 0;
}

// 하위 프로세스 - 정상 코드
function serve2() {
    var a = 1;
    console.log(a);
}

// 프로세스 실행 - 에러 발생 시 "exception!!!" 출력
try {
    func(serve2);
    
} catch {
    console.log("exception!!!");

}

// process.nextTick()안에 넣어서 함수를 실행하면, 좀 더 정확하게 어떤 에러인지 파악할 수 있게 도와준다.
// 그리고 console.log("test")의 실행 우선순위도 달라지는 것을 알 수 있다.
// 모든 함수를 실행하고 난 후에 에러를 출력한다.

// 그리고 모든 이벤트 루프에서 가장 먼저 실행하도록 해준다는 점