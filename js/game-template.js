import headerTemplate from "./header";
import footerTemplate from "./footer";

const gameScreens = Object.freeze({
  "game-1": {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    options: new Set([
      `<div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`,
      `<div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`
    ])
  },
  "game-2": {
    task: `Угадай, фото или рисунок?`,
    options: new Set([`<div class="game__option">
      <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
      <label class="game__answer  game__answer--photo">
        <input name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--wide  game__answer--paint">
        <input name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>`])
  },
  "game-3": {
    task: `Найдите рисунок среди изображений`,
    options: new Set([
      `<div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>`,
      `<div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 2" width="304" height="455">
      </div>`,
      `<div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 3" width="304" height="455">
      </div>`
    ])
  }
});

const gameTemplate = (state) => `${headerTemplate(state)}
<div class="game">
  <p class="game__task">${gameScreens[state.gameNumb].task}</p>
  <form class="game__content">
    ${[...gameScreens[state.gameNumb].options].join(``)}
  </form>
  <div class="stats">
    <ul class="stats">
      ${state.gameResults.map((el) =>
        `<li class="stats__result stats__result--${el}"></li>`)
        .join(``)}
    </ul>
  </div>
</div>
${footerTemplate}`;

export default gameTemplate;
