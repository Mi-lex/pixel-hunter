import RulesView from "./rules-view";
import {changeView} from "../utilities";
import app from "../main";

export default class RulesPresenter {
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
