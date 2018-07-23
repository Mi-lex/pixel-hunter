import IntroView from "./intro-view";
import {changeView} from "../utilities";
import app from "../main";


export default class IntroPresenter {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    changeView(this.view);
    this.view.onStart = function () {
      app.showGreeting();
    };
  }
}
