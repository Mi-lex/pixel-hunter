import StatsView from "./stats-view";
import app from "../main";
import {changeView} from "../utilities";

export default class StatsPresenter {
  constructor(stats) {
    this.stats = stats;
    this.view = new StatsView(this.stats);
  }

  init() {
    changeView(this.view);

    this.view.onBack = () => {
      app.showIntro();
    }
  }
}
