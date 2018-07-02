import getElementFromTemplate from "./template";
import initialState from "./data";
import headerTemplate from "./header";
import footerTemplate from "./footer";
import game2Element from "./game-2";
import renderScreen from "./render";
import debounce from "./debounce";

const game1Template = `
${headerTemplate(initialState)}
<div class="game">
  <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
  <form class="game__content">
    <div class="game__option">
      <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
    <div class="game__option">
      <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
      <label class="game__answer  game__answer--photo">
        <input name="question2" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input name="question2" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
  </form>
  <div class="stats">
    <ul class="stats">
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--correct"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
    </ul>
  </div>
</div>
${footerTemplate}`;

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
