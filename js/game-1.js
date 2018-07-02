import getElementFromTemplate from "./template";
import initialState from "./data";
import gameTemplate from "./game-template";
import game2Element from "./game-2";
import renderScreen from "./render";
import debounce from "./debounce";

const game1Template = gameTemplate(initialState);

const game1Element = getElementFromTemplate(game1Template),
      gameContent = game1Element.querySelector(`.game__content`),
      amountOfQuestions = 2;

const contentUpdate = () => {
  const amountOfAnswers = gameContent.querySelectorAll(`input[type=radio]:checked`).length;

  if (amountOfAnswers === amountOfQuestions) {
    renderScreen(game2Element);
  }
};

const onRadioClickHandler = (e) => {
  if (e.target.closest(`input[type=radio]`)) {
    debounce(contentUpdate, 500);
  }
};

gameContent.addEventListener(`click`, onRadioClickHandler);

export default game1Element;
