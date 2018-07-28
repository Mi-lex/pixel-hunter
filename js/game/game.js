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
    this.userName = localStorage.getItem(`name`);
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
    // Show current game screen and then start the timer
    changeView(this.view);
    this.startTimer();

    // Override view method which triggers when user gives answer

    /**
     * Gets answer and considers next step depending on current state.
     * @param {boolean} answer - answer given by user
     * @return {void}
     */
    this.view.onAnswer = (answer) => {
      this.stopTimer();
      const answerDuration = this.initialTime - this.state.time;
      const isAnswCorrect = answer;
      const result = getResult(answerDuration, isAnswCorrect);

      // if it's last level, show statistics screen
      if (this.state.gameNumb === this.state.stats.length) {
        this.state = setResult(this.state, result);

        const statsObj = {
          stats: this.state.stats,
          lives: this.state.lives
        };
        app.showStats(this.userName, statsObj);
        // if level is not last, make a new view depending on level type and execute init method recursively
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
