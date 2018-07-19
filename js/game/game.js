import LevelView from "./level-view";
import gameOverScreen from "../gameover/gameover";
import {changeView} from "../utilities";
import {initialState, setResult, tick, isAnswerCorrect, resultType} from "../data/data";

const changeLevel = (state) => {
  const level = new LevelView(state);
  const initialTime = state.time;

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
    const answerDuration = initialTime - state.time;
    const isAnswCorrect = (answer === false) ? false : isAnswerCorrect(answer, state);
    let result, nextView;

    if (isAnswCorrect) {
      if (answerDuration <= 10) {
          result = resultType.FAST;
      } else if (answerDuration <= 20) {
          result = resultType.CORRECT;
      } else if (answerDuration > 20) {
          result = resultType.SLOW;
      }
    } else {
        result = resultType.WRONG;
    }

    if (state.gameNumb === 3) {
      nextView = gameOverScreen(setResult(state, result));
    } else {
        nextView = changeLevel(setResult(state, result));
    }

    changeView(nextView);
  };

  startTimer();
  return level;
};

export default () => changeLevel(initialState);
