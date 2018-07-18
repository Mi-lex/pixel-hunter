import RulesView from "./rules-view";
import startGame from "../game/game";
import {changeView} from "../utilities";

const rules = new RulesView();

rules.nextScreen = function () {
  changeView(startGame());
};

export default rules;
