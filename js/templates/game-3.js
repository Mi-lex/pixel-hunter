import getElementFromTemplate from "./template";
import data from "../data";
import initialState from "../state";
import gameTemplate from "./game-template";
import statsElement from "./stats";
import renderScreen from "../render";

const game3contentTemplate = (data, state) => `
${data.gameContents[state.gameNumb].options.map((src, numb) =>
  `<div class="game__option">
    <img src="${src}" alt="Option ${numb}" width="304" height="455">
  </div>`)
  .join(``)}`;

const game3Function = () => {
  const game3Template = gameTemplate(data, game3contentTemplate,
    Object.assign({}, initialState, {
      gameNumb: `game-3`
    }
  ));

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
  renderScreen(game3Element);
};

export default game3Function;
