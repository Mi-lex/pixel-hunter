import {renderScreen, getElementFromTemplate, debounce} from "../utilities";
import {states} from "../data";
import gameTemplate from "./game-template";
import game2Function from "./game-2";
import {gameEnding, gameTimer} from "../game-process";


const game1Function = () => {
  states.current = Object.assign({}, states.initial, {
    gameResults: new Array(10).fill(`unknown`)
  });

  const game1Template = gameTemplate(),
    game1Element = getElementFromTemplate(game1Template),
    gameContent = game1Element.querySelector(`.game__content`),
    amountOfQuestions = 2;

  const contentUpdate = () => {
    const answers = gameContent.querySelectorAll(`input[type=radio]:checked`);

    if (answers.length === amountOfQuestions) {
      gameEnding(answers, game2Function);
    }
  };

  const onRadioClickHandler = (e) => {
    if (e.target.closest(`input[type=radio]`)) {
      debounce.start(contentUpdate, 500);
    }
  };

  gameContent.addEventListener(`click`, onRadioClickHandler);
  renderScreen(game1Element);
  gameTimer.start(game2Function);
};

export default game1Function;
