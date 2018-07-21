import introScreen from "./intro/intro";
import greetingScreen from './greeting/greeting';
import rulesScreen from './rules/rules';
import GamePresenter from './game/game';
import StatsPresenter from './stats/stats';

export default class Application {
  static showIntro() {
    introScreen.init();
  }

  static showGreeting() {
    greetingScreen.init();
  }

  static showRules() {
    rulesScreen.init();
  }

  static showGame() {
    const gameScreen = new GamePresenter();
    gameScreen.init();
  }

  static showStats(state) {
    const statsScreen = new StatsPresenter(state);
    statsScreen.init();
  }
}

window.addEventListener(`load`, () => {
  Application.showIntro();
});
