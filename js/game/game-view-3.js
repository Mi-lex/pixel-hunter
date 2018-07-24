// Game view for "one-of-three" type

import GameView from "./game-view";
import footerTemplate from "../templates/footer";

const drawContent = (level) => {
  return level.answers.map((answer, numb) => {
    return `<div class="game__option">
              <img src="${answer.image.url}" width=${answer.image.width} height=${answer.image.height} alt="Option ${numb + 1}">
            </div>`;
  }).join(``);
};

export default class GameType1View extends GameView {
  constructor(state) {
    super(state);
  }

  get template() {
    return `${this.gameHeaderTemplate}
            <div class="game">
              <p class="game__task">${this.level.question}</p>
              <form class="game__content game__content--triple">
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
    const content = this._element.querySelector(`.game__content`);

    const onContentClickHandler = (e) => {
      const selectedOpt = e.target.closest(`.game__option`);

      if (selectedOpt) {
        selectedOpt.classList.add(`game__option--selected`);
        this.onAnswer(true);
      }
    };

    content.addEventListener(`click`, onContentClickHandler);
    this.extraGameElementsBind();
  }
}
