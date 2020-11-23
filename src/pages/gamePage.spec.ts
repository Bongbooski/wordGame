import * as wordService from "./../service/wordService";
import "./../index";

let wrapper;
jest.useFakeTimers();

describe("gamePage", () => {
  beforeEach(() => {
    Object.defineProperty(wordService, "getWords", {
      value: jest.fn().mockResolvedValue({
        data: [
          { second: 5, text: "temp1" },
          { second: 6, text: "temp2" },
          { second: 7, text: "temp3" },
          { second: 8, text: "temp4" },
          { second: 9, text: "temp5" },
          { second: 5, text: "temp6" },
        ],
      }),
    });
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
  it("단어 배열이 정상 조회되면 게임화면이 표시된다", () => {
    const requiredWord = wrapper.find("#requiredWord").hostNodes();
    const scoreDiv = wrapper.find("#scoreDiv").hostNodes();
    const typedWord = wrapper.find("#typedWord").hostNodes();
    expect(requiredWord.innerText).toBe("temp1");
    expect(scoreDiv.innerHTML).toBe("<p>6점</p>");
    expect(typedWord.disabled).toBe("true");
  });

  it("시작버튼 클릭시 인풋창이 활성화된다.", () => {
    const typedWord = wrapper.find("#typedWord").hostNodes();
    const startButton = wrapper.find("#start").hostNodes();

    startButton.simulate("click");

    expect(startButton.innerText).toBe("초기화");
    expect(typedWord.disabled).toBe("false");
  });

  it("주어진 단어와 다른 단어를 입력하고 엔터 입력하는 경우 인풋창이 초기화된다", () => {
    const typedWord = wrapper.find("#typedWord").hostNodes();
    typedWord.simulate("focus");
    typedWord.simulate("change", { target: { value: "test1" } });
    typedWord.simulate("keyDown", { keyCode: 13 });
    expect(typedWord.value).toBe("");
  });

  it("주어진 시간내에 입력하지 않은 경우 -1점 되며 다음 단어로 넘어간다.", () => {
    const requiredWord = wrapper.find("#requiredWord").hostNodes();
    const scoreDiv = wrapper.find("#scoreDiv").hostNodes();
    const typedWord = wrapper.find("#typedWord").hostNodes();

    typedWord.simulate("focus");
    typedWord.simulate("change", { target: { value: "test1" } });
    jest.advanceTimersByTime(5001);

    expect(requiredWord.innerText).toBe("temp2");
    expect(scoreDiv.innerHTML).toBe("<p>5점</p>");
    expect(typedWord.value).toBe("");
  });

  it("주어진 시간내에 알맞은 단어를 입력하고 엔터 입력하는 경우 점수 차감없이 다음 단어로 넘어간다.", () => {
    const requiredWord = wrapper.find("#requiredWord").hostNodes();
    const scoreDiv = wrapper.find("#scoreDiv").hostNodes();
    const typedWord = wrapper.find("#typedWord").hostNodes();

    typedWord.simulate("focus");
    typedWord.simulate("change", { target: { value: "temp2" } });
    typedWord.simulate("keyDown", { keyCode: 13 });

    expect(requiredWord.innerText).toBe("temp3");
    expect(scoreDiv.innerHTML).toBe("<p>5점</p>");
    expect(typedWord.value).toBe("");
  });
});
