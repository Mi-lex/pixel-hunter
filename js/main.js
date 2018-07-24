import Intro from "./intro/intro";
import Greeting from './greeting/greeting';
import Rules from './rules/rules';
import Game from './game/game';
import Stats from './stats/stats';
import {statsHashCypher, statsHashDecypher} from './data/stats-data';

const ControllerID = {
  INTRO: ``,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`
};

const getControllerIDFromHash = (hash) => {
  return hash ? hash.replace(`#`, ``).match(/[^=]+/g) : [``];
};

class Application {
  constructor() {
    this.routes = {
      [ControllerID.INTRO]: Intro,
      [ControllerID.GREETING]: Greeting,
      [ControllerID.RULES]: Rules,
      [ControllerID.GAME]: Game,
      [ControllerID.STATS]: Stats
    }
  }

  changeController(route = ``, param) {
    const Controller = this.routes[route];

    if (route === ControllerID.STATS) {
      const stats = statsHashDecypher(param);
      new Controller(stats).init();
    } else {
        new Controller().init();
    }
  }

  init() {
    window.onhashchange = () => {
      this.changeController(...getControllerIDFromHash(location.hash));
    };

    this.changeController(...getControllerIDFromHash(location.hash));
  }

  showIntro() {
    location.hash = ControllerID.INTRO;
  }

  showGreeting() {
    location.hash = ControllerID.GREETING;
  }

  showRules() {
    location.hash = ControllerID.RULES;
  }

  showGame() {
    location.hash = ControllerID.GAME;
  }

  showStats(stats) {
    const hashStats = statsHashCypher(stats);
    location.hash = `${ControllerID.STATS}=${hashStats}`;
  }
}

const app = new Application();
export default app;

window.addEventListener(`load`, () => {
  app.init();
});
