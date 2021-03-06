// Synchronous 동기: 순차적으로 실행되는 것 (블록방식 & 논블록킹방식)
/*
  개요: 동기라고 하면 한자의 같을 동(同) 기약할 기(期)를 생각하여 동시에 일어난다고 생각하기 쉽지만 이런 생각은 절대적으로 금물이다.
  앞으로 적어도 IT에서 동기는 '같은 기간' 혹은 '같은 주기'라고 생각하는 것이 좋다.
  생각해보라, 지금 이 파일을 테스트해본다면 '순차적으로 A, B, C, D, E 가 출력'될 것 이다.

  같은 기간에 모두 잘 출력이 되었다.
  그렇지만 뭔가 말이 이상하다.

  더 풀어서 쓴다면

  "현재 작업의 응답과 다음 작업의 요청"을 하는 것 이것이 동기라고 생각한다.
  즉, 결국에 저러한 요청은 순서를 가지고 진행될 수 밖에 없다.
*/

// 하위 프로세스
function employee () {
  for (let i = 1; i < 101; i++) {
    console.log(`직원: 인형 눈알 붙히기 ${i}번 수행`);
  }
}

// 상위 프로세스
function boss () {
  console.log('사장: 출근');
  employee();
  console.log('사장: 퇴근');
}

boss();