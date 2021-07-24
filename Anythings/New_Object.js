// 테스트 함수 생성
class test_Funcs {
  // 생성자
  constructor () {}

  // 이름 로그
  NameLog(name) {
    console.log("This Name: " + name);
  }
}

new test_Funcs();

// 테스트용 메인 오브젝트 생성 및 함수 클래스 상속
class test_Object extends test_Funcs {
  // 생성자
  constructor(index) {
    // 부모 클래스의 생성자 호출
    super();

    // Name 변수
    this.name = "Test_Object" + index.toString(); 
    this.NameLog(this.name);
  }
}


// 테스트용 메인 오브젝트의 인스턴스 생성
new test_Object(1);
new test_Object(2);
new test_Object(3);
new test_Object(4);
new test_Object(5);
new test_Object(6);

