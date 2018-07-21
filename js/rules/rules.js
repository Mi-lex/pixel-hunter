import RulesView from "./rules-view";
import {changeView} from "../utilities";
import app from "../main";

class RulesPresenter {
  constructor() {
    this.view = new RulesView();
  }

  init() {
    changeView(this.view);
    this.view.nextScreen = function () {
      app.showGame();
    };

    this.view.onBack = function () {
      app.showIntro();
    };
  }
}

const rules = new RulesPresenter();

export default rules;
