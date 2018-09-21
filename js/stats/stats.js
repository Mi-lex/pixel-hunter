import StatsView from "./stats-view";
import app from "../application";
import Model from "../model";
import {changeView} from "../utilities";

export default class StatsPresenter {
  constructor(userResult, userName) {
    this.userResult = userResult;
    this.model = new class extends Model {
      get urlRead() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/stats/${userName}`;
      }

      get urlWrite() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/stats/${userName}`;
      }
    }();
  }

  showUserResultTable() {
    this.model.load()
        .then((resultTable) => {
          this.view = new StatsView(resultTable);

          this.view.onBack = () => {
            app.restart();
          };
        })
        .then(() => changeView(this.view))
        .catch(window.console.error);
  }

  init() {
    if (this.userResult) {
      this.model.send(this.userResult)
          .then(() => this.showUserResultTable());
    } else {

      this.showUserResultTable();
    }
  }
}
