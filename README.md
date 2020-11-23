# wordGame 해결 전략
 - hot loading
   - webpack.config.js의 devServer에 hot: true 조건 부여
   
 - 라우팅
   - webpack.config.js의 historyApiFallback: true 설정 활용하여, index.ts에서 pathname으로 분기 처리
   - root 페이지: 게임을 진행하는 페이지
   - /end 페이지: 게임 결과 출력 페이지
   - 기타 페이지: 404 처리 페이지
   
## 게임화면 처리
 - 문제 풀이 대상 단어 배열 획득
   - root 페이지 접속시 GamePage생성자에서 주어진 단어 배열 획득하는 메소드 호출(wordService의 getWords())
   - promise사용하여 비동기식으로 배열 획득 후, 대상 단어 정보 및 변수 세팅과 화면 세팅(setGamePage())
 
 - 시간제한
   - 타이머 변수(counter)를 gamePage의 전역변수로 두어, 기존 단어 통과 후(정답 또는 시간초과) timer()함수 호출시 기존 타이머는 취소 후 새로운 타이머 설정하도록 구현
   
 - 게임시작시
   - 게임 진행 여부 값에 따라 '초기화', '시작' 텍스트 변경/ 인풋박스 disabled처리 변경/ 인풋박스에 포커스
   - 게임이 끝난 경우 초기화 함수 호출
   - 게임 정보 세팅 함수 호출(setGameInfo())
   
 - 정답/오답처리
   - 인풋박스에서 엔터 이벤트 발생시, 현재 인덱스의 단어와 인풋의 value비교하여, 정답일때만 소요 시간 저장 및 다음 스텝 진행(nextStep()호출)
   - 정오답 관계없이 인풋박스의 밸류 초기화
   
 - 다음 문제로 진행시
   - 현재 인덱스를 +1하고 배열 길이와 같거나 커지면 게임 종료로 판단하여 location.state에 소요시간 평균치와 점수를 pushState한 뒤 /end페이지 호출
   - 현재 인덱스+1 한 값이 배열 길이보다 작으면 다시 게임정보 세팅하는 함수 호출(setGameInfo())
   
 ## 종료화면 처리
   - 결과 정보 처리
     - 점수와 평균 시간은 기본값으로 0 세팅 -> location.state값이 정상 전달 되지 않은 경우(/end로 직접 접근 등) 보여주기 위한 기본값
     - location.state의 값을 읽어서 결과 화면용 정보 획득
     
 ## 기타 화면 처리
   - 없는 path로 접근시 에러 발생하지 않고 존재하지 않는 페이지임을 알리도록 처리
