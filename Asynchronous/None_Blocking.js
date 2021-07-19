// 하위 프로세스
function employee (maxDollCount = 1, report) {
  let dollCount = 0;
  const interval = setInterval(() => {
    if (dollCount > maxDollCount) {
      report();
      clearInterval(interval);
    }
    dollCount++;
    console.log(`직원: 인형 눈알 붙히기 ${dollCount}번 수행`);
  }, 10);
}

// 상위 프로세스
function boss () {
  console.log('사장: 출근 후 지시');
  employee(100, () => console.log('직원: 눈알 결산 보고'));
  console.log('사장: 퇴근');
}

// 프로세스 실행
boss();

/*
  비동기 & 논블로킹 방식은 여러 개의 작업을 동시에 처리할 수 있는 부분에서 효율적이라고 할 수 있지만, 
  너무 복잡하게 얽힌 비동기 처리 때문에 개발자가 어플리케이션의 흐름을 읽기 어려워지는 등의 문제가 있을 수 있다. 
  JavaScript에서 Promise나 async/await와 같은 문법을 사용하는 이유도 이런 비동기 처리의 흐름을 좀 더 명확하게 인지하고자 하는 노력인 것이다.
*/