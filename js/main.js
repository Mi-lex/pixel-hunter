import Intro from "./intro/intro";
import Greeting from './greeting/greeting';
import Rules from './rules/rules';
import Game from './game/game';
import Stats from './stats/stats';
import Model from "./model";
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
    this.model = new class extends Model {
      get urlRead() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/questions`;
      }
    }();

    this.model.load()
      .then((data) => this.setup(data))
      .then(() => this.changeController(...getControllerIDFromHash(location.hash)))
      .catch(window.console.error);
  }

  changeController(route = ``, param) {
    let controller;

    if (route === ControllerID.STATS) {
      const stats = statsHashDecypher(param);
      controller = new this.routes[route](stats);
    } else {
        controller = this.routes[route];
    }

    controller.init();
  }

  setup(data) {
    this.routes = {
      [ControllerID.INTRO]: new Intro(),
      [ControllerID.GREETING]: new Greeting(),
      [ControllerID.RULES]: new Rules(),
      [ControllerID.GAME]: new Game(data),
      [ControllerID.STATS]: Stats
    };
  }

  init() {
    window.onhashchange = () => {
      this.changeController(...getControllerIDFromHash(location.hash));
    };
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
