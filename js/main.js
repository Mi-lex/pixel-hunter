import introElement from "./intro";
import renderScreen from "./render";

window.addEventListener(`load`, () => {
  renderScreen(introElement);
});

window.addEventListener(`click`, (e) => {
  if (e.target.closest(`.back`)) {
    renderScreen(introElement);
  }
});
