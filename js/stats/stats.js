import StatsView from "./stats-view";
import app from "../main";
import {initialState} from "../data/data";
import {changeView} from "../utilities";

export default class StatsPresenter {
  constructor(state = initialState) {
    this.state = state;
    this.view = new StatsView(state);
  }

  init() {
    changeView(this.view);

    this.view.onBack = () => {
      app.showIntro();
    }
  }
}
