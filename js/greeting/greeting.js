import GreetingView from "./greeting-view";
import {changeView} from "../utilities";
import app from "../main";

export default class GreetingPresentor {
  constructor() {
    this.view = new GreetingView();
  }

  init() {
    changeView(this.view);

    this.view.nextScreen = function () {
      app.showRules();
    };
  }
}
