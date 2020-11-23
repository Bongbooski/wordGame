import "./endPage.scss";
let completeMessage: HTMLElement;
let scoreMessage: HTMLElement;
let averageTimeMessage: HTMLElement;
let replayButton: HTMLButtonElement;

export default class EndPage extends HTMLElement {
  constructor() {
    super();
    this.id = "endPage";
    setEndPage(this);
  }
}

const setEndPage = (endPage: HTMLElement) => {
  let score = 0;
  let averageTime = 0;
  if (history.state) {
    score = history.state.score ? history.state.score : 0;
    averageTime = history.state.averageTime ? history.state.averageTime : 0;
  }
  completeMessage = document.createElement("h2");
  completeMessage.id = "completeMessage";
  completeMessage.innerText = "Mission Complete!";
  endPage.appendChild(completeMessage);

  scoreMessage = document.createElement("h1");
  scoreMessage.id = "scoreMessage";
  scoreMessage.innerText = "당신의 점수는 " + score + "점입니다.";
  endPage.appendChild(scoreMessage);

  averageTimeMessage = document.createElement("h3");
  averageTimeMessage.id = "averageTimeMessage";
  averageTimeMessage.innerText =
    "단어당 평균 답변 시간은 " + averageTime + "초입니다.";
  endPage.appendChild(averageTimeMessage);

  replayButton = document.createElement("button");
  replayButton.id = "replay";
  replayButton.type = "submit";
  replayButton.innerText = "다시 시작";
  replayButton.addEventListener("click", replayHandler);
  endPage.appendChild(replayButton);
};

const replayHandler = () => {
  location.href = "/";
};

customElements.define("end-page", EndPage);
