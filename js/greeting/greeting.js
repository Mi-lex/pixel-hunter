import GreetingView from "./greeting-view";
import {changeView} from "../utilities";
import app from "../main";

class GreetingPresentor {
  constructor() {
    this.view = new GreetingView();
  }

  init() {
    changeView(this.view);

    this.view.nextScreen = function () {
      app.showRules();
    }
  }
}

const greeting = new GreetingPresentor();

export default greeting;
