import getElementFromTemplate from "./template";
import initialState from "./data";
import gameTemplate from "./game-template";
import game3Element from "./game-3";
import renderScreen from "./render";

const game2Template = gameTemplate(Object.assign({}, initialState, {
  gameNumb: `game-2`
}));

const game2Element = getElementFromTemplate(game2Template),
      gameContent = game2Element.querySelector(`.game__content`),
      amountOfQuestions = 1;

const onRadioClickHandler = (e) => {
  if (e.target.closest(`input[type=radio]`)) {
    const amountOfAnswers = gameContent.querySelectorAll(`input[type=radio]:checked`).length;

    if (amountOfAnswers === amountOfQuestions) {
      renderScreen(game3Element);
    }
  }
};

gameContent.addEventListener(`click`, onRadioClickHandler);
gameContent.classList.add(`game__content--wide`);

export default game2Element;
