// Game view for "one-of-three" type

import GameView from "./game-view";

export default class GameType1View extends GameView {
  constructor(state, level) {
    super(state, level);
  }

  get contentTemplate() {
    return this.level.answers.map((answer, numb) => {
      const answerSizes = [answer.image.naturalWidth, answer.image.naturalHeight,
        answer.image.width, answer.image.height];
      // Gets proper image size properties depending on frame size
      const imageSizeProps = this.getImageSizeProperties(...answerSizes);

      return `<div class="game__option">
                <img src="${answer.image.url}" width=${imageSizeProps.widthProp} height=${imageSizeProps.heightProp} alt="Option ${numb + 1}">
              </div>`;
    }).join(``);
  }

  bind() {
    const content = this._element.querySelector(`.game__content`);

    const onContentClickHandler = (e) => {
      const selectedOpt = e.target.closest(`.game__option`);

      if (selectedOpt) {
        selectedOpt.classList.add(`game__option--selected`);
        const url = selectedOpt.querySelector(`img`).src;
        this.onAnswer(this.isAnswerCorrect(url));
      }
    };

    content.addEventListener(`click`, onContentClickHandler);
    super.bind();
  }

  isAnswerCorrect(url) {
    const type = (~this.level.question.indexOf(`рисунок`)) ? `painting` : `photo`;
    const correctAnswer = this.level.answers.find((answer) => {
      return answer.image.url === url && answer.type === type;
    });

    return (correctAnswer) ? true : false;
  }
}
