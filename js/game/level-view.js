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

export const drawStats = (stats) =>
  stats
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
    this.level = getLevel(levelNumber);
    let contentType = ``;

    switch (this.level.options.length) {
      case 1:
        contentType = `game__content--wide`;
        break;
      case 3:
        contentType = `game__content--triple`;
        break;
    }

    return `${headerTemplate(drawHeader(this.state))}
            <div class="game">
              <p class="game__task">${this.level.task}</p>
              <form class="game__content ${contentType}">
                ${drawContent(this.level)}
              </form>
              <div class="stats">
                <ul class="stats">
                  ${drawStats(this.state.stats)}
                </ul>
              </div>
            </div>
            ${footerTemplate}`;
  }

  bind() {
    this.timerElement = this._element.querySelector(`.game__timer`);
    const content = this._element.querySelector(`.game__content`),
      backElement = this._element.querySelector(`.header__back`);

    let onContentClickHandler, answer;

    if (this.level.hasNotInput) {
      onContentClickHandler = (e) => {
        const selectedOpt = e.target.closest(`.game__option`);

        if (selectedOpt) {
          selectedOpt.classList.add(`game__option--selected`);
          answer = selectedOpt.querySelector(`img`).src;
          this.onAnswer(answer);
        }
      };
    } else {
        const amountOfQuestions = this.level.options.length;

        onContentClickHandler = (e) => {
          if (e.target.closest(`input[type=radio]`)) {
            const answers = content.querySelectorAll(`input[type=radio]:checked`);

            if (answers.length === amountOfQuestions) {
              answer = Array.from(answers).map((input) => input.value);
              this.onAnswer(answer);
            }
          }
        };
    }

    content.addEventListener(`click`, onContentClickHandler);
    backElement.addEventListener(`click`, () => {
      this.onBack();
    });
  }

  onAnswer(answer) {
    return answer;
  }

  onBack() {

  }

  updateTime(time) {
    if (time === 0) {
      this.onAnswer(false);
    } else {
        this.timerElement .textContent = time;
    }
  }
}
