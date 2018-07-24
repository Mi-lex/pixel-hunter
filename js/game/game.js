import GameType1View from "./game-view-1";
import GameType2View from "./game-view-2";
import GameType3View from "./game-view-3";
import {changeView} from "../utilities";
import {initialState, getResult, setResult, tick, getLevel, isAnswerCorrect} from "../data/game-data";
import app from "../main";

const GameView = {
  "tinder-like": GameType1View,
  "two-of-two": GameType2View,
  "one-of-three": GameType3View
};

export default class GamePresenter {
  constructor(state = initialState) {
    this.state = state;
    this.initialTime = this.state.time;
    this.view = new GameView[getLevel(this.state.gameNumb).type](this.state);
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
      // const isAnswCorrect = isAnswerCorrect(answer, this.state);
      const isAnswCorrect = answer;
      const result = getResult(answerDuration, isAnswCorrect);

      // if it's last level, show statistics screen
      if (this.state.gameNumb === this.state.stats.length) {
        app.showStats(setResult(this.state, result).stats);
      } else {
          this.state = setResult(this.state, result);
          this.view = new GameView[getLevel(this.state.gameNumb).type](this.state);
          this.init();
      }
    };

    this.view.onBack = () => {
      this.stopTimer();
      app.showIntro();
    };
  }
}
