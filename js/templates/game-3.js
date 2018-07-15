import {renderScreen, getElementFromTemplate} from "../utilities";
import gameTemplate from "./game-template";
import {statsFunction} from "./stats";
import {gameEnding, gameTimer} from "../game-process";

const game3Function = () => {
  const game3Template = gameTemplate(),
    game3Element = getElementFromTemplate(game3Template),
    gameContent = game3Element.querySelector(`.game__content`);

  gameContent.addEventListener(`click`, (e) => {
    const selectedOpt = e.target.closest(`.game__option`);

    if (selectedOpt) {
      selectedOpt.classList.add(`game__option--selected`);
      gameEnding([selectedOpt.querySelector(`img`).src], statsFunction);
    }
  });

  gameContent.classList.add(`game__content--triple`);
  renderScreen(game3Element);
  gameTimer.start(statsFunction);
};

export default game3Function;
