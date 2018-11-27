import Intro from "./intro/intro";
import Greeting from './greeting/greeting';
import Rules from './rules/rules';
import Game from './game/game';
import Stats from './stats/stats';
import Model from "./model";
import {SpinningStar} from "./star";
import {changeView} from "./utilities";

const ControllerID = {
  INTRO: ``,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`
};

const getControllerVariablesFromHash = (hash) => {
  return hash ? hash.replace(`#`, ``).split(`?`) : [``];
};

class Application {
  constructor() {
    this.preloadingScreen = new SpinningStar();
    this.userName = `Guest`;
    this.model = new class extends Model {
      get urlRead() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/questions`;
      }
    }();
  }

  loadData() {
    changeView(this.preloadingScreen);
    return new Promise((resolve) => {
      this.model.load()
          .then((data) => {
            this.setup();
            this.gameData = data;
            resolve();
          })
          .catch(window.console.error);
    });
  }

  restart() {
    this.loadData()
        .then(() => {
          this.showIntro();
        });
  }

  changeController(route = ``, ...variables) {
    let controller;
    let userName;

    switch (route) {
      case ControllerID.GAME:
        [userName] = variables;
        controller = new this.routes[route](this.gameData, userName);
        break;
      case ControllerID.STATS:
        [userName] = variables;
        controller = new this.routes[route](this.userResult, userName);
        break;

      default:
        controller = new this.routes[route]();
        break;
    }

    controller.init();
  }

  setup() {
    this.routes = {
      [ControllerID.INTRO]: Intro,
      [ControllerID.GREETING]: Greeting,
      [ControllerID.RULES]: Rules,
      [ControllerID.GAME]: Game,
      [ControllerID.STATS]: Stats
    };
  }

  init() {
    window.onhashchange = () => {
      this.changeController(...getControllerVariablesFromHash(location.hash));
    };

    this.loadData()
        .then(() => this.changeController(...getControllerVariablesFromHash(location.hash)));
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

  showGame(userName) {
    location.hash = `${ControllerID.GAME}?${userName}`;
  }

  showStats(userName, userResult) {
    this.userResult = userResult;
    location.hash = `${ControllerID.STATS}?${userName}`;
  }
}

const app = new Application();
export default app;
