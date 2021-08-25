// 동기 vs 비동기 : 처리해야 할 작업들을 어떠한 '흐름'으로 처리 할 것인가에 대한 관점
// 블로킹 vs 논블로킹 : 처리되어야 하는 (하나의) 작업이, 전체적인 작업 '흐름'을 막느냐 안막느냐에 대한 관점

// 비동기(async)+논블로킹 방식이 갖는 장점은 다른 3가지 경우에 비교하여 독보적이라 할 수 있습니다. 
// 흔히 '비동기로 처리했다' 라는 말을 주로 사용하는데 이는 수행하고자 하는 작업이 '논블로킹'임을 내포하는 말입니다. 
// 순차적으로 작업이 처리되어야 한다면 '동기' 혹은 '블로킹' 방식을 사용해야 합니다.

// 하위 프로세스
function* employee() {
  for (let i=1; i<101; i++) {
    console.log('직원: 인형 눈알 붙히기 ' + i + "번 수행");
    yield;
  }
  return;
}

// 상위 프로세스
function boss() {
  console.log('사장: 출근');
  
  const generator = employee();
  let result = {};

  while (!result.done) {
    console.log('사장: 유튜브 시청...');
    result = generator.next();
  }

  console.log('사장: 퇴근');
}

boss();
