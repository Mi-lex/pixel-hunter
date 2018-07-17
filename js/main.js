import intro from "./intro/intro";
import {changeView} from "./utilities";

window.addEventListener(`load`, () => {
  changeView(intro);
});

window.addEventListener(`click`, (e) => {
  if (e.target.closest(`.back`)) {
    changeView(intro);
  }
});
