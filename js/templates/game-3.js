import getElementFromTemplate from "./template";
import gameTemplate from "./game-template";
import statsFunction from "./stats";
import renderScreen from "../render";
import gameProcess from "../game-process";

const game3contentTemplate = (data) => `
${data.gameContents[data.currentState.gameNumb - 1].options.src.map((src, numb) =>
  `<div class="game__option">
    <img src="${src}" alt="Option ${numb + 1}" width="304" height="455">
  </div>`)
  .join(``)}`;

const game3Function = () => {
  const game3Template = gameTemplate(game3contentTemplate);

  const game3Element = getElementFromTemplate(game3Template),
        gameContent = game3Element.querySelector(`.game__content`);

  gameContent.addEventListener(`click`, (e) => {
    const selectedOpt = e.target.closest(`.game__option`);

    if (selectedOpt) {
      selectedOpt.classList.add(`game__option--selected`);
      gameProcess.answerValidation([selectedOpt.querySelector(`img`).src], statsFunction);
    }
  });

  gameContent.classList.add(`game__content--triple`);
  renderScreen(game3Element);
  gameProcess.gameTime.startTimer(statsFunction);
};

export default game3Function;
