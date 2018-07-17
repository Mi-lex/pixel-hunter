import GreetingView from "./greeting-view";
import rules from "../rules/rules";
import {changeView} from "../utilities";

const greeting = new GreetingView();

greeting.nextScreen = function () {
  changeView(rules);
};

export default greeting;
