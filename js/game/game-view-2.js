// Game view for "two-of-two" type

import GameView from "./game-view";

export default class GameType1View extends GameView {
  constructor(state, level) {
    super(state, level);
  }

  bind() {
    const content = this._element.querySelector(`.game__content`);
    const amountOfOptions = this.level.answers.length;

    const onContentClickHandler = (e) => {
      if (e.target.closest(`input[type=radio]`)) {
        const answers = content.querySelectorAll(`input[type=radio]:checked`);
        const amountOfGivenAnswers = answers.length;

        if (amountOfGivenAnswers === amountOfOptions) {
          const givenValues = Array.from(answers).map((el) => el.value);
          this.onAnswer(this.isAnswerCorrect(givenValues));
        }
      }
    };

    content.addEventListener(`click`, onContentClickHandler);
    super.bind();
  }

  isAnswerCorrect(values) {
    const wrongAnswer = this.level.answers.find((answer, numb) => {
      return answer.type !== values[numb];
    });

    return (!wrongAnswer) ? true : false;
  }
}
