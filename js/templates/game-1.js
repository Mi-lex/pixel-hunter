import getElementFromTemplate from "./template";
import data from "../data";
import initialState from "../state";
import gameTemplate from "./game-template";
import game2Function from "./game-2";
import renderScreen from "../render";
import debounce from "../debounce";

const game1contentTemplate = (data, state) => `
${data.gameContents[state.gameNumb].options.map((src, numb) =>
  `<div class="game__option">
    <img src="${src}" alt="Option ${numb}" width="468" height="458">
    <label class="game__answer game__answer--photo">
      <input name="question${numb}" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input name="question${numb}" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>`)
  .join(``)}`;

const game1Function = () => {
  const game1Template = gameTemplate(data, game1contentTemplate, initialState),
        game1Element = getElementFromTemplate(game1Template),
        gameContent = game1Element.querySelector(`.game__content`),
        amountOfQuestions = 2;

  const contentUpdate = () => {
    const amountOfAnswers = gameContent.querySelectorAll(`input[type=radio]:checked`).length;

    if (amountOfAnswers === amountOfQuestions) {
      game2Function();
    }
  };

  const onRadioClickHandler = (e) => {
    if (e.target.closest(`input[type=radio]`)) {
      debounce(contentUpdate, 500);
    }
  };

  gameContent.addEventListener(`click`, onRadioClickHandler);
  renderScreen(game1Element);
};

export default game1Function;
