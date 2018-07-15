import {renderScreen, getElementFromTemplate} from "../utilities";
import gameTemplate from "./game-template";
import game3Function from "./game-3";
import {gameEnding, gameTimer} from "../game-process";


const game2Function = () => {
  const game2Template = gameTemplate(),
    game2Element = getElementFromTemplate(game2Template),
    gameContent = game2Element.querySelector(`.game__content`);

  const onRadioClickHandler = (e) => {
    if (e.target.closest(`input[type=radio]`)) {
      const answer = gameContent.querySelectorAll(`input[type=radio]:checked`);

      if (answer.length) {
        gameEnding(answer, game3Function);
      }
    }
  };

  gameContent.addEventListener(`click`, onRadioClickHandler);
  gameContent.classList.add(`game__content--wide`);

  renderScreen(game2Element);
  gameTimer.start(game3Function);
};

export default game2Function;
