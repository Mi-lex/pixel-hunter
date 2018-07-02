import introElement from "./intro";
import renderScreen from "./render";
import data from "./data";

window.addEventListener(`load`, () => {
  renderScreen(introElement);
});

window.addEventListener(`click`, (e) => {
  if (e.target.closest(`.back`)) {
    renderScreen(introElement);
  }
});
