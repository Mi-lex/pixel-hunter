import answerValidation from "./answer-validation";

const gameTime = {};

gameTime.startTimer = function (callback) {
  let count = document.querySelector(`.game__timer`);

  this.timerAction = () => {
    count.textContent = count.textContent - 1;

    if (+count.textContent === 0) {
    	answerValidation(false, callback);
      clearTimeout(this.timer);
    } else {
    	 this.timer = setTimeout(this.timerAction, 1000);
    }
  };

  this.timer = setTimeout(this.timerAction, 1000);
};

export default gameTime;
