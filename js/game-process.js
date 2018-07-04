import data from "./data";

const gameProcess = {};
gameProcess.gameTime = {};

gameProcess.gameTime.startTimer = function (callback) {
  let countElement = document.querySelector(`.game__timer`);

  this.timerAction = () => {
    countElement.textContent = countElement.textContent - 1;

    if (+countElement.textContent === 0) {
      gameProcess.answerValidation(false, callback);
      clearTimeout(this.timer);
    } else {
        this.timer = setTimeout(this.timerAction, 1000);
    }
  };

  this.timer = setTimeout(this.timerAction, 1000);
};

gameProcess.setResult = (result) => {
  data.currentState.gameResults[data.currentState.gameNumb - 1] = result;
  data.currentState.gameNumb += 1;
};

gameProcess.answerValidation = function (answer, callback) {
  clearTimeout(this.gameTime.timer);

  if (!answer) {
    this.setResult(`wrong`);
    callback();
    return
  }

  const answerDuration = 30 - document.querySelector(`.game__timer`).textContent;

  const areAnswersCorrect = Array.from(answer).find((el, numb) => {
    return el.value != data.gameContents[data.currentState.gameNumb - 1].options[numb].answer;
  });

  if (!areAnswersCorrect) {
    this.setResult(`wrong`);
  } else if (answerDuration <= 10) {
      this.setResult(`fast`);
  } else if (answerDuration <= 20) {
      this.setResult(`correct`);
  } else if (answerDuration > 20) {
      this.setResult(`slow`);
  }

  callback();
};

export default gameProcess;
