import IntroView from "./intro-view";
import greeting from "../greeting/greeting";
import {changeView} from "../utilities";

const intro = new IntroView();

intro.onStart = function () {
  changeView(greeting);
};

export default intro;
