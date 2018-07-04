import getElementFromTemplate from "./template";
import initialState from "../state";
import data from "../data";
import gameTemplate from "./game-template";
import game2Function from "./game-2";
import gameProcess from "../game-process";
import renderScreen from "../render";
import debounce from "../debounce";

const game1contentTemplate = (data) => `
${data.gameContents[data.currentState.gameNumb - 1].options.map((opt, numb) =>
  `<div class="game__option">
    <img src="${opt.src}" alt="Option ${numb + 1}" width="468" height="458">
    <label class="game__answer game__answer--photo">
      <input name="question${numb + 1}" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input name="question${numb + 1}" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>`)
  .join(``)}`;

const game1Function = () => {
  data.currentState = Object.assign({}, initialState, {
    gameResults: new Array(10).fill(`unknown`)
  });
  const game1Template = gameTemplate(game1contentTemplate),
        game1Element = getElementFromTemplate(game1Template),
        gameContent = game1Element.querySelector(`.game__content`),
        amountOfQuestions = 2;

  const contentUpdate = () => {
    const answers = gameContent.querySelectorAll(`input[type=radio]:checked`);

    if (answers.length === amountOfQuestions) {
      gameProcess.answerValidation(answers, game2Function);
    }
  };

  const onRadioClickHandler = (e) => {
    if (e.target.closest(`input[type=radio]`)) {
      debounce(contentUpdate, 500);
    }
  };

  gameContent.addEventListener(`click`, onRadioClickHandler);
  renderScreen(game1Element);
  gameProcess.gameTime.startTimer(game2Function);
};

export default game1Function;
