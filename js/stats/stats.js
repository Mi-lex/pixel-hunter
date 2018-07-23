import StatsView from "./stats-view";
import app from "../main";
import {initialState} from "../data/data";
import {changeView} from "../utilities";

export default class StatsPresenter {
  constructor(stats = initialState.stats) {
    this.stats = stats;
    this.view = new StatsView(stats);
  }

  init() {
    changeView(this.view);

    this.view.onBack = () => {
      app.showIntro();
    }
  }
}
