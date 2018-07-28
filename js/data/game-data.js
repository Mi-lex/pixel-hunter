import {resultType} from "../data/stats-data";

export const tick = (state) => {
  const currentState = Object.assign({}, state);
  currentState.time += -1;

  return currentState;
};

const INITIAL_LEVEL = 1;
const MAX_TIME = 30;
const MAX_LIVES = 3;
const INITIAL_STATS = new Array(10).fill(`unknown`);

export const initialState = Object.freeze({
  gameNumb: INITIAL_LEVEL,
  time: MAX_TIME,
  lives: MAX_LIVES,
  stats: INITIAL_STATS
});

/**
 * Defines user result depending on his performance.
 * @param {integer} answerTime - The time that the user spent giving an answer.
 * @param {boolean} answerCorrect - Was the answer correct or not.
 * @return {string} - result.
 */

export const getResult = (answerTime, answerCorrect) => {
  let result;

  if (answerCorrect) {
    if (answerTime <= 10) {
        result = resultType.FAST;
    } else if (answerTime <= 20) {
        result = resultType.CORRECT;
    } else if (answerTime > 20) {
        result = resultType.SLOW;
    }
  } else {
      result = resultType.WRONG;
  }

  return result;
};

export const incLevel = (state) => {
  state.gameNumb += 1;
};

const decLives = (state) => {
  if (state.lives === 0) {
    return;
  }
  state.lives += -1;
};

/**
 * Gets state, makes copy and sets result of the game in the copy.
 * @param {obj} state - Initial state or state of previous game.
 * @param {string} levelResult - Word, describing user performance
 * @return {obj} - new state.
 */

export const setResult = (state, levelResult) => {
  const currentState = Object.assign({}, state, {
    stats: state.stats.slice(),
    time: initialState.time
  });

  currentState.stats[state.gameNumb - 1] = levelResult;

  if (levelResult === `wrong`) {
    decLives(currentState);
  }

  if (currentState.gameNumb < currentState.stats.length) {
    incLevel(currentState);
  }

  return currentState;
};
