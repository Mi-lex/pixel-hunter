// Game view for "two-of-two" type

import GameView from "./game-view";
import {drawContent} from "./game-view-1";
import footerTemplate from "../templates/footer";

export default class GameType1View extends GameView {
  constructor(state) {
    super(state);
  }

  get template() {
    return `${this.gameHeaderTemplate}
            <div class="game">
              <p class="game__task">${this.level.question}</p>
              <form class="game__content">
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
    const content = this._element.querySelector(`.game__content`),
      amountOfOptions = this.level.answers.length;

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
    this.extraGameElementsBind();
  }

  isAnswerCorrect(values) {
    const wrongAnswer = this.level.answers.find((answer, numb) => {
      return answer.type !== values[numb];
    });

    return (!wrongAnswer) ? true : false;
  }
}
