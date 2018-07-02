import getElementFromTemplate from "./template";
import initialState from "./data";
import gameTemplate from "./game-template";
import statsElement from "./stats";
import renderScreen from "./render";

const game3Template = gameTemplate(Object.assign({}, initialState, {
  gameNumb: `game-3`
}));

const game3Element = getElementFromTemplate(game3Template),
      gameContent = game3Element.querySelector(`.game__content`);

gameContent.addEventListener(`click`, (e) => {
  const selectedOpt = e.target.closest(`.game__option`);

  if (selectedOpt) {
    selectedOpt.classList.add(`game__option--selected`);
    renderScreen(statsElement);
  }
});

gameContent.classList.add(`game__content--triple`);

export default game3Element;
