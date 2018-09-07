import Intro from "./intro/intro";
import Greeting from './greeting/greeting';
import Rules from './rules/rules';
import Game from './game/game';
import Stats from './stats/stats';
import Model from "./model";

const ControllerID = {
  INTRO: ``,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`
};

const getControllerIDFromHash = (hash) => {
  return hash ? hash.replace(`#`, ``).split(`?`) : [``];
};

class Application {
  constructor() {
    this.userName = `Guest`;
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

  changeController(route = ``, userName = `Guest`) {
    let controller;

    if (route === ControllerID.STATS) {
      controller = new this.routes[route](this.userResult, userName);
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

  showStats(userName, userResult) {
    this.userResult = userResult;
    location.hash = `${ControllerID.STATS}?${userName}`;
  }
}

const app = new Application();
export default app;

window.addEventListener(`load`, () => {
  app.init();
});
