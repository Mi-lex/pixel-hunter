import LevelView from "./level-view";
import gameOverScreen from "../gameover/gameover";
import {changeView} from "../utilities";
import {initialState, setResult, resultType} from "../data/data";

const changeLevel = (state) => {
  const level = new LevelView(state);

  level.onAnswer = (answer) => {
    if (state.gameNumb === 3) {
      changeView(gameOverScreen(setResult(state, resultType.CORRECT)));
    } else if (answer) {
        const temporaryString = resultType.SLOW;
        changeView(changeLevel(setResult(state, temporaryString)));
    }
  };

  return level;
};

export default () => changeLevel(initialState);
