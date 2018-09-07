import AbstractView from "../view";
import headerTemplate from "../templates/header";

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


export const drawStats = (stats) =>
  stats.map((el) => `<li class="stats__result stats__result--${el}"></li>`).join(``);

export default class GameView extends AbstractView {
  constructor(state, level) {
    super();
    this.state = state;
    this.level = level;
  }

  get gameHeaderTemplate() {
    return headerTemplate(drawHeader(this.state));
  }

  get statsTemplate() {
    return drawStats(this.state.stats);
  }

  bind() {
    this.backElement = this._element.querySelector(`.header__back`);
    this.timerElement = this._element.querySelector(`.game__timer`);

    this.backElement.addEventListener(`click`, () => {
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
      this.timerElement.textContent = time;
    }
  }
}
