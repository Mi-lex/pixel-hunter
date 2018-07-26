// Game view for "tinder-like" type

import GameView from "./game-view";
import footerTemplate from "../templates/footer";

export const drawContent = (level) => {
  return level.answers.map((answer, numb) => {
    return `<div class="game__option">
              <img src="${answer.image.url}" width=100% height=100% alt="Option ${numb + 1}">
              <label class="game__answer game__answer--photo">
                  <input name="question${numb + 1}" type="radio" value="photo">
                  <span>Фото</span>
                </label>
                <label class="game__answer game__answer--paint">
                  <input name="question${numb + 1}" type="radio" value="painting">
                  <span>Рисунок</span>
                </label>
            </div>`;
  }).join(``);
};

export default class GameType2View extends GameView {
  constructor(state, level) {
    super(state, level);
  }

  get template() {
    return `${this.gameHeaderTemplate}
            <div class="game">
              <p class="game__task">${this.level.question}</p>
              <form class="game__content game__content--wide">
                ${drawContent(this.level)}
              </form>
              <div class="stats">
                <ul class="stats">
                  ${this.statsTemplate}
                </ul>
              </div>
            </div>
            ${footerTemplate}`;
  }

  bind() {
    this.timerElement = this._element.querySelector(`.game__timer`);
    const content = this._element.querySelector(`.game__content`);

    const onContentClickHandler = (e) => {
      if (e.target.closest(`input[type=radio]`)) {
        const givenValue = content.querySelector(`input[type=radio]:checked`).value;

        this.onAnswer(this.isAnswerCorrect(givenValue));
      }
    };

    content.addEventListener(`click`, onContentClickHandler);
    this.extraGameElementsBind();
  }

  isAnswerCorrect(value) {
    return value === this.level.answers[0].type;
  }
}
