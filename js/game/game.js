import LevelView from "./level-view";
import {changeView} from "../utilities";
import {initialState, setResult, tick, isAnswerCorrect, resultType} from "../data/data";
import app from "../main";

export default class GamePresenter {
  constructor(state = initialState) {
    this.state = state;
    this.initialTime = this.state.time;
    this.view = new LevelView(this.state);
  }

  startTimer() {
    const action = () => {
      this.state = tick(this.state);
      this.view.updateTime(this.state.time);
      this.timer = setTimeout(action, 1000);
    };
    this.timer = setTimeout(action, 1000);
  }

  stopTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  init() {
    changeView(this.view);
    this.startTimer();

    this.view.onAnswer = (answer) => {
      this.stopTimer();
      const answerDuration = this.initialTime - this.state.time;
      const isAnswCorrect = isAnswerCorrect(answer, this.state);
      let result;

      if (isAnswCorrect) {
        if (answerDuration <= 10) {
            result = resultType.FAST;
        } else if (answerDuration <= 20) {
            result = resultType.CORRECT;
        } else if (answerDuration > 20) {
            result = resultType.SLOW;
        }
      } else {
          result = resultType.WRONG;
      }

      if (this.state.gameNumb === this.state.stats.length) {
        app.showStats(setResult(this.state, result).stats);
      } else {
          this.state = setResult(this.state, result);
          this.view = new LevelView(this.state);
          this.init();
      }
    };

    this.view.onBack = () => {
      this.stopTimer();
      app.showIntro();
    };
  }
}
