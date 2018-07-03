import getElementFromTemplate from "./template";
import data from "../data";
import initialState from "../state";
import gameTemplate from "./game-template";
import game3Function from "./game-3";
import renderScreen from "../render";

const game2contentTemplate = (data, state) =>`
  <div class="game__option">
    <img src="${data.gameContents[state.gameNumb].options}" alt="Option 1" width="705" height="455">
    <label class="game__answer  game__answer--photo">
      <input name="question1" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--wide  game__answer--paint">
      <input name="question1" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>`;

const game2Function = () => {
  const game2Template = gameTemplate(data, game2contentTemplate,
    Object.assign({}, initialState, {
      gameNumb: `game-2`
    }
  ));

  const game2Element = getElementFromTemplate(game2Template),
        gameContent = game2Element.querySelector(`.game__content`),
        amountOfQuestions = 1;

  const onRadioClickHandler = (e) => {
    if (e.target.closest(`input[type=radio]`)) {
      const amountOfAnswers = gameContent.querySelectorAll(`input[type=radio]:checked`).length;

      if (amountOfAnswers === amountOfQuestions) {
        game3Function();
      }
    }
  };

  gameContent.addEventListener(`click`, onRadioClickHandler);
  gameContent.classList.add(`game__content--wide`);

  renderScreen(game2Element);
};

export default game2Function;
