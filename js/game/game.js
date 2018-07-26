import GameType1View from "./game-view-1";
import GameType2View from "./game-view-2";
import GameType3View from "./game-view-3";
import {changeView} from "../utilities";
import {initialState, getResult, setResult, tick} from "../data/game-data";
import app from "../main";

const GameView = {
  "tinder-like": GameType1View,
  "two-of-two": GameType2View,
  "one-of-three": GameType3View
};

export default class GamePresenter {
  constructor(levels, state = initialState) {
    this.levels = levels;
    this.state = state;
    this.initialTime = this.state.time;
    this.view = new GameView[this.getLevel().type](this.state, this.getLevel());
  }

  getLevel() {
    return this.levels[this.state.gameNumb - 1];
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
      const isAnswCorrect = answer;
      const result = getResult(answerDuration, isAnswCorrect);

      // if it's last level, show statistics screen
      if (this.state.gameNumb === this.state.stats.length) {
        app.showStats(setResult(this.state, result).stats);
      } else {
          this.state = setResult(this.state, result);
          const nextLevel = this.getLevel();
          this.view = new GameView[nextLevel.type](this.state, nextLevel);
          this.init();
      }
    };

    this.view.onBack = () => {
      this.stopTimer();
      app.showIntro();
    };
  }
}
