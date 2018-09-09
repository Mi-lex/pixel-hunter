// Game view for "tinder-like" type

import GameView from "./game-view";

export default class GameType2View extends GameView {
  constructor(state, level) {
    super(state, level);
  }

  bind() {
    const content = this._element.querySelector(`.game__content`);

    const onContentClickHandler = (e) => {
      if (e.target.closest(`input[type=radio]`)) {
        const givenValue = content.querySelector(`input[type=radio]:checked`).value;

        this.onAnswer(this.isAnswerCorrect(givenValue));
      }
    };

    content.addEventListener(`click`, onContentClickHandler);
    super.bind();
  }

  isAnswerCorrect(value) {
    return value === this.level.answers[0].type;
  }
}
