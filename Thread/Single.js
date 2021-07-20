// 상위 프로세스
function test(callback) {
    process.nextTick(callback);
}

// 하위 프로세스
function sprtCB(num) {
    throw Error('강제 에러 발생');
    console.log('sprt 완료', Math.sprt(num));
}

// 프로세스 실행 및 오류 캐치 ( 하지만, "에러입니다."가 출력되지 않는다. )
try {
    test(sprtCB);
}
catch (err) {
    console.log('에러입니다.');
}

// 프로세스 오류 캐치 함수
process.on('uncaughtException', (err) => {
    if (err) console.error(err.message);
})
