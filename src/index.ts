import "./index.scss";
import GamePage from "./pages/gamePage";
import EndPage from "./pages/endPage";
import ErrorPage from "./pages/errorPage";

if (window.location.pathname === "/") {
  const gamePage = new GamePage();
  document.getElementById("root").appendChild(gamePage);
} else if (window.location.pathname === "/end") {
  const endPage = new EndPage();
  document.getElementById("root").appendChild(endPage);
} else {
  const errorPage = new ErrorPage();
  document.getElementById("root").appendChild(errorPage);
}
