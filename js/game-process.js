import {states, gameContents} from "./data";

export const gameTimer = {};

gameTimer.stop = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
};

/**
 * Gets timer element and decrements it every second
 * @param {function} callback - callback function for answerValidation, that
 * executed when time ends
 * @return {void}
 */

gameTimer.start = function (callback) {
  this.stop();

  let countElement = document.querySelector(`.game__timer`);

  const timerAction = () => {
    countElement.textContent = countElement.textContent - 1;

    if (Number(countElement.textContent) === 0) {
      gameEnding(false, callback);
    } else {
      this.timer = setTimeout(timerAction, 1000);
    }
  };

  this.timer = setTimeout(timerAction, 1000);
};

const incLevel = () => {
  states.current.gameNumb += 1;
};

const decLives = () => {
  if (states.current.lives === 0) {
    return;
  }
  states.current.lives += -1;
};

/**
 * Sets result of the game in current state obj. Calls extra functions required
 * for game logic
 * @param {string} result - Word, describing last user performance
 * @return {void}
 */

const setResult = (result) => {
  states.current.gameResults[states.current.gameNumb - 1] = result;
  incLevel();

  if (result === `wrong`) {
    decLives();
  }
};

export const gameEnding = function (answer, callback) {
  gameTimer.stop();

  if (!answer) {
    setResult(`wrong`);
    callback();
    return;
  }

  const answerDuration = 30 - document.querySelector(`.game__timer`).textContent;

  const findWrongAnswer = Array.from(answer).find((el, numb) => {
    const options = gameContents[states.current.gameNumb - 1].options;

    if (el.value) {
      return el.value != options[numb].answer;
    } else {
        return el.src != options.answer;
    }
  });

  if (findWrongAnswer) {
    setResult(`wrong`);
  } else if (answerDuration <= 10) {
      setResult(`fast`);
  } else if (answerDuration <= 20) {
      setResult(`correct`);
  } else if (answerDuration > 20) {
      setResult(`slow`);
  }

  callback();
};
