import * as wordService from "./../service/wordService";
import * as util from "./../common/util";
import "./gamePage.scss";

let requiredWord: HTMLElement;
let leftTimeDiv: HTMLElement;
let startButton: HTMLButtonElement;
let typedWordInput: HTMLInputElement;
let scoreDiv: HTMLElement;

let wordArray;
let time = 0;
let wordIndex = 0;
let targetWord = "";
let isGaming = false;
let counter;
let score = 0;
const scoreArry = [];

export default class GamePage extends HTMLElement {
  constructor() {
    super();
    this.id = "gamePage";
    wordService.getWords().then((result) => {
      wordArray = result;
      score = wordArray.data.length;
      setGamePage(this);
      setGameInfo();
    });
  }
}

const setGamePage = (gamePage: HTMLElement) => {
  leftTimeDiv = document.createElement("div");
  leftTimeDiv.id = "leftTime";
  gamePage.appendChild(leftTimeDiv);

  scoreDiv = document.createElement("div");
  scoreDiv.id = "scoreDiv";
  gamePage.appendChild(scoreDiv);

  requiredWord = document.createElement("h1");
  requiredWord.id = "requiredWord";
  gamePage.appendChild(requiredWord);

  typedWordInput = document.createElement("input");
  typedWordInput.id = "typedWord";
  typedWordInput.type = "text";
  typedWordInput.disabled = true;
  typedWordInput.addEventListener("keydown", inputKeyDown);
  gamePage.appendChild(typedWordInput);

  startButton = document.createElement("button");
  startButton.id = "start";
  startButton.type = "submit";
  startButton.innerText = "시작";
  startButton.addEventListener("click", startHandler);
  gamePage.appendChild(startButton);
};
const setGameInfo = () => {
  time = wordArray.data[wordIndex].second;
  targetWord = wordArray.data[wordIndex].text;
  leftTimeDiv.innerHTML = "<p>남은시간: " + time + "초</p>";
  scoreDiv.innerHTML = "<p>점수: " + score + "점</p>";
  requiredWord.innerText = targetWord;
  if (isGaming) {
    clearInterval(counter);
    timer();
  }
};

const timer = () => {
  counter = setInterval(() => {
    time = time - 1;
    leftTimeDiv.innerHTML = "<p>남은시간: " + time + "초</p>";
    if (time < 0) {
      clearInterval(counter);
      score--;
      nextStep();
      return;
    }
  }, 1000);
};

const clearGame = () => {
  time = 0;
  wordIndex = 0;
  score = wordArray.data.length;
  (<HTMLInputElement>typedWordInput).value = "";
  clearInterval(counter);
  typedWordInput.setAttribute("disabled", "true");
  startButton.innerText = "시작";
};

const startHandler = () => {
  if (!isGaming) {
    startButton.innerText = "초기화";
    typedWordInput.removeAttribute("disabled");
    typedWordInput.focus();
    timer();
  } else {
    clearGame();
  }
  isGaming = !isGaming;
  setGameInfo();
};

const nextStep = () => {
  wordIndex++;
  if (wordIndex >= wordArray.data.length) {
    const state = { score: score, averageTime: util.getAverage(scoreArry) };
    const title = "";
    const url = "/end";
    history.pushState(state, title, url);
    location.href = "/end";
  } else {
    setGameInfo();
  }
};

const inputKeyDown = (e) => {
  if (e.keyCode == 13) {
    if ((<HTMLInputElement>typedWordInput).value === targetWord) {
      scoreArry.push(wordArray.data[wordIndex].second - time);
      nextStep();
    }
    (<HTMLInputElement>typedWordInput).value = "";
  }
};

customElements.define("game-page", GamePage);
