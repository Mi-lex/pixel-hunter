import RulesView from "./rules-view";
import {changeView} from "../utilities";
import app from "../application";

export default class RulesPresenter {
  constructor() {
    this.view = new RulesView();
  }

  init() {
    changeView(this.view);
    this.view.onUserNameSubmit = (name) => {
      localStorage.setItem(`name`, name);
      app.showGame(name);
    };

    this.view.onBack = function () {
      app.showIntro();
    };
  }
}
