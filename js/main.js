import introFunction from "./templates/intro";

window.addEventListener(`load`, () => {
  introFunction();
});

window.addEventListener(`click`, (e) => {
  if (e.target.closest(`.back`)) {
    introFunction();
  }
});
