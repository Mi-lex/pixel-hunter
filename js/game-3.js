import getElementFromTemplate from "./template";
import initialState from "./data";
import headerTemplate from "./header";
import footerTemplate from "./footer";
import statsElement from "./stats";
import renderScreen from "./render";

const game3Template = `
${headerTemplate(initialState)}
<div class="game">
  <p class="game__task">Найдите рисунок среди изображений</p>
  <form class="game__content  game__content--triple">
    <div class="game__option">
      <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
    </div>
    <div class="game__option  game__option--selected">
      <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
    </div>
    <div class="game__option">
      <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
    </div>
  </form>
  <div class="stats">
    <ul class="stats">
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--correct"></li>
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--unknown"></li>
    </ul>
  </div>
</div>
${footerTemplate}`;

const game3Element = getElementFromTemplate(game3Template),
      gameContent = game3Element.querySelector(`.game__content`);

let selectedOpt = gameContent.querySelector(`.game__option--selected`);

selectedOpt.classList.remove(`game__option--selected`);

gameContent.addEventListener(`click`, (e) => {
  selectedOpt = e.target.closest(`.game__option`);

  if (selectedOpt) {
    selectedOpt.classList.add(`game__option--selected`);
    renderScreen(statsElement);
  }
});

export default game3Element;
