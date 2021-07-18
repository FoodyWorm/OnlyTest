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
