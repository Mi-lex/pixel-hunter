import LevelView from "./level-view";
import gameOverScreen from "../gameover/gameover";
import {changeView} from "../utilities";
import {initialState, setResult, resultType, tick} from "../data/data";

const changeLevel = (state) => {
  const level = new LevelView(state);

  let timer;
  const startTimer = () => {
    const action = () => {
      state = tick(state);
      level.updateTime(state.time);
      timer = setTimeout(action, 1000);
    };

    timer = setTimeout(action, 1000);
  };

  const stopTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }
  };

  level.onAnswer = (answer) => {
    stopTimer();

    if (state.gameNumb === 3) {
      changeView(gameOverScreen(setResult(state, resultType.CORRECT)));
    } else if (answer) {
        const temporaryString = resultType.SLOW;
        changeView(changeLevel(setResult(state, temporaryString)));
    }
  };

  startTimer();
  return level;
};

export default () => changeLevel(initialState);
