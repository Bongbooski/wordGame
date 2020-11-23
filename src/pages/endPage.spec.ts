import "./../index";

let wrapper;

describe("endPage", () => {
  beforeEach(() => {
    global.window = Object.create(window);
    const url = "http://localhost:9000/end";
    Object.defineProperty(window, "location", {
      value: {
        href: url,
        state: {
          score: 3,
          averageTime: 2,
        },
      },
    });
  });

  it("정상 종료시 결과페이지를 보여준다", () => {
    const completeMessage = wrapper.find("#completeMessage").hostNodes();
    const scoreMessage = wrapper.find("#scoreMessage").hostNodes();
    const averageTimeMessage = wrapper.find("#averageTimeMessage").hostNodes();
    const replay = wrapper.find("#replay").hostNodes();
    expect(completeMessage.innerText).toBe("Mission Complete!");
    expect(scoreMessage.innerText).toBe("당신의 점수는 3점입니다.");
    expect(averageTimeMessage.innerText).toBe(
      "단어당 평균 답변 시간은 2초입니다."
    );
    expect(replay.innerText).toBe("다시 시작");
  });
});
