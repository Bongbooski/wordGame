import "./errorPage.scss";

let notExistingPageMessage: HTMLElement;
let toGameButton: HTMLButtonElement;

export default class ErrorPage extends HTMLElement {
  constructor() {
    super();
    this.id = "errorPage";
    setErrorPage(this);
  }
}

const setErrorPage = (errorPage: HTMLElement) => {
  notExistingPageMessage = document.createElement("h1");
  notExistingPageMessage.id = "notExistingPageMessage";
  notExistingPageMessage.innerText = "존재하지 않는 페이지 입니다.";
  errorPage.appendChild(notExistingPageMessage);

  toGameButton = document.createElement("button");
  toGameButton.id = "toGame";
  toGameButton.type = "submit";
  toGameButton.innerText = "게임으로 돌아가기";
  toGameButton.addEventListener("click", toGameHandler);
  errorPage.appendChild(toGameButton);
};

const toGameHandler = () => {
  location.href = "/";
};
customElements.define("error-page", ErrorPage);
