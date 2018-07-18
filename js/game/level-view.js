import AbstractView from "../view";
import headerTemplate from "../templates/header";
import footerTemplate from "../templates/footer";
import {getLevel} from "../data/data";

const drawHeader = (state) =>
  `<h1 class="game__timer">${state.time}</h1>
  <div class="game__lives">
    ${new Array(3 - state.lives)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
    ${new Array(state.lives)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
  </div>`;

const drawContent = (level) => {
  return level.options.map((src, numb) => {
    const inputs = level.hasNotInput ? `` :
      `<label class="game__answer game__answer--photo">
        <input name="question${numb + 1}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input name="question${numb + 1}" type="radio" value="paint">
        <span>Рисунок</span>
      </label>`;

    const contentTemplate =
    `<div class="game__option">
    <img src="${src}" width=100% height=100% alt="Option ${numb + 1}">
      ${inputs}
    </div>`;

    return contentTemplate;
  }).join(``);
};

export const drawStats = (state) =>
  state.stats
      .map((el) =>
        `<li class="stats__result stats__result--${el}"></li>`)
      .join(``);

export default class LevelsView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const levelNumber = this.state.gameNumb;
    const level = getLevel(levelNumber);
    let contentType = ``;

    switch (levelNumber) {
      case 2:
        contentType = `game__content--wide`;
        break;
      case 3:
        contentType = `game__content--triple`;
        break;
    }

    return `${headerTemplate(drawHeader(this.state))}
            <div class="game">
              <p class="game__task">${level.task}</p>
              <form class="game__content ${contentType}">
                ${drawContent(level)}
              </form>
              <div class="stats">
                <ul class="stats">
                  ${drawStats(this.state)}
                </ul>
              </div>
            </div>
            ${footerTemplate}`;
  }

  bind() {
    const content = this._element.querySelector(`.game__content`),
      amountOfQuestions = 2;

    // const answerUpdate = () => {
    //   const answers = content.querySelectorAll(`input[type=radio]:checked`);
    //
    //   if (answers.length === amountOfQuestions) {
    //     this.onAnswer(answers);
    //   }
    // };

    const onRadioClickHandler = (e) => {
      if (e.target.closest(`.game__option`)) {
        this.onAnswer("answer");
      }
    };

    content.addEventListener(`click`, onRadioClickHandler);
  }

  onAnswer(answer) {
    return answer;
  }
}
