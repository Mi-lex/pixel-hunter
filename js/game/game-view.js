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

const GameContentClass = {
  "tinder-like": `game__content--wide`,
  "two-of-two": ``,
  "one-of-three": `game__content--triple`
};

export const drawStats = (stats) =>
  stats.map((el) => `<li class="stats__result stats__result--${el}"></li>`).join(``);

export default class GameView extends AbstractView {
  constructor(state, level) {
    super();
    this.state = state;
    this.level = level;
  }

  get template() {
    return `${this.gameHeaderTemplate}
            <div class="game">
              <p class="game__task">${this.level.question}</p>
              <form class="${`game__content ${GameContentClass[this.level.type]}`.trim()}">
                ${this.contentTemplate}
              </form>
              <div class="stats">
                <ul class="stats">
                  ${this.statsTemplate}
                </ul>
              </div>
            </div>`;
  }

  get contentTemplate() {
    return this.level.answers.map((answer, numb) => {
      const answerSizes = [answer.image.naturalWidth, answer.image.naturalHeight,
        answer.image.width, answer.image.height];
      // Gets proper image size properties depending on frame size
      const imageSizeProps = this.getImageSizeProperties(...answerSizes);

      return `<div class="game__option">
                <img src="${answer.image.url}" width=${imageSizeProps.widthProp} height=${imageSizeProps.heightProp} alt="Option ${numb + 1}">
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
  }

  get gameHeaderTemplate() {
    return headerTemplate(drawHeader(this.state));
  }

  get statsTemplate() {
    return drawStats(this.state.stats);
  }

  /**
   * Gets natural size of image and size of frame and calculate
   * proper css params for image width and height:
   * @param {number} nWidth - natural image width
   * @param {number} nHeight - natural image height
   * @param {number} fWidth - frame width
   * @param {number} fHeight - frame height
   * @return {object} - suitable css width and height properties 
   */
  getImageSizeProperties(nWidth, nHeight, fWidth, fHeight) {
    const imageWHratio = nWidth / nHeight;
    const frameWHration = fWidth / fHeight;

    const isImageWider = imageWHratio > frameWHration;
    const [widthProp, heightProp] = isImageWider ? [`100%`, `auto`] : [`auto`, `100%`];

    return {
      widthProp,
      heightProp
    };
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
