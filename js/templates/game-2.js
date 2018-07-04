import getElementFromTemplate from "./template";
import gameTemplate from "./game-template";
import game3Function from "./game-3";
import gameProcess from "../game-process";
import renderScreen from "../render";

const game2contentTemplate = (data) =>`
  <div class="game__option">
    <img src="${data.gameContents[data.currentState.gameNumb - 1].options[0].src}" alt="Option 1" width="705" height="455">
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
  const game2Template = gameTemplate(game2contentTemplate);

  const game2Element = getElementFromTemplate(game2Template),
        gameContent = game2Element.querySelector(`.game__content`);

  const onRadioClickHandler = (e) => {
    if (e.target.closest(`input[type=radio]`)) {
      const answer = gameContent.querySelectorAll(`input[type=radio]:checked`);

      if (answer.length) {
        gameProcess.answerValidation(answer, game3Function);
      }
    }
  };

  gameContent.addEventListener(`click`, onRadioClickHandler);
  gameContent.classList.add(`game__content--wide`);

  renderScreen(game2Element);
  gameProcess.gameTime.startTimer(game3Function);
};

export default game2Function;
