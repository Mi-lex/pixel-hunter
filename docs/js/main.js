(function () {
'use strict';

const getElementFromTemplate = (template) => {
  const container = document.createElement(`div`);
  container.innerHTML = template;

  return container;
};

const changeView = (view) => {
  const main = document.querySelector(`.central`);

  main.innerHTML = ``;
  main.appendChild(view.element);
};

const debounce = {};

debounce.start = function (action, delayTime) {
  clearTimeout(this.timer);

  this.timer = setTimeout(() => {
    action();
  }, delayTime);
};

const imageLoader = (url) => {
  return new Promise((resolve, reject) => {
    let timeOut = null;
    const img = new Image();

    img.onload = function () {
      clearTimeout(timeOut);

      // Put natural size of loaded image into the object
      const imageNaturalSizes = {
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      };

      resolve(imageNaturalSizes);
    };

    img.onerror = function () {
      clearTimeout(timeOut);
      reject();
      throw new Error(`Downloading error!`);
    };

    timeOut = setTimeout(function () {
      reject();
      throw new Error(`Time out error!`);
    }, 40000);

    img.src = url;
  });
};

class AbstractView {
  bind() {

  }

  render() {
    return getElementFromTemplate(this.template);
  }

  get template() {
    throw new Error(`You have to specify your template`);
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
}

class IntroView extends AbstractView {
  get template() {
    return `<div id="main" class="central__content">
              <div id="intro" class="intro">
                <h1 class="intro__asterisk">*</h1>
                <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
              </div>
            </div>`;
  }

  bind() {
    const starBtn = this._element.querySelector(`.intro__asterisk`);

    const onStarBtnClickHandler = (e) => {
      if (e.target.closest(`.intro__asterisk`)) {
        this.onStart();
      }
    };

    starBtn.addEventListener(`click`, onStarBtnClickHandler);
  }

  onStart() {

  }
}

class IntroPresenter {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    changeView(this.view);
    this.view.onStart = function () {
      app.showGreeting();
    };
  }
}

class GreetingView extends AbstractView {
  get template() {
    return `<div class="greeting central--blur">
              <div class="greeting__logo">
                <img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter">
              </div>
              <h1 class="greeting__asterisk">*</h1>
              <div class="greeting__challenge">
                <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
                <p>Правила игры просты.<br>
                  Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
                  Задача кажется тривиальной, но не думай, что все так просто.<br>
                  Фотореализм обманчив и коварен.<br>
                  Помни, главное — смотреть очень внимательно.</p>
              </div>
              <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
            </div>`;
  }

  bind() {
    const nextBtn = this._element.querySelector(`.greeting__continue`);

    const onNextBtnClickHandler = (e) => {
      if (e.target.closest(`.greeting__continue`)) {
        this.nextScreen();
      }
    };

    nextBtn.addEventListener(`click`, onNextBtnClickHandler);
  }

  nextScreen() {

  }
}

class GreetingPresentor {
  constructor() {
    this.view = new GreetingView();
  }

  init() {
    changeView(this.view);

    this.view.nextScreen = function () {
      app.showRules();
    };
  }
}

const headerTemplate = (extraTemplate) => {
  const extraHeader = extraTemplate ? extraTemplate : ``;

  const commonTemplate = `<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    ${extraHeader}
  </header>`.trim();

  return commonTemplate;
};

class RulesView extends AbstractView {
  get template() {
    return `${headerTemplate()}
            <div class="rules">
              <h1 class="rules__title">Правила</h1>
              <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
                src="img/photo_icon.png" width="16" height="16"> или рисунок <img
                src="img/paint_icon.png" width="16" height="16" alt="">.<br>
                Фотографиями или рисунками могут быть оба изображения.<br>
                На каждую попытку отводится 30 секунд.<br>
                Ошибиться можно не более 3 раз.<br>
                <br>
                Готовы?
              </p>
              <form class="rules__form">
                <input class="rules__input" type="text" placeholder="Ваше Имя" 
                  value="${localStorage.getItem(`name`) || ``}">
                <button class="rules__button continue" 
                  type="submit" ${(localStorage.getItem(`name`)) ? `` : `disabled`}>
                  Go!
                </button>
              </form>
            </div>`;
  }

  bind() {
    const form = this._element.querySelector(`.rules__form`);
    const userNameInput = form.querySelector(`.rules__input`);
    const submitBtn = form.querySelector(`.rules__button`);
    const backElement = this._element.querySelector(`.header__back`);

    const btnUpdate = () => {
      submitBtn.disabled = !(userNameInput.value.length > 1);
    };

    userNameInput.addEventListener(`input`, () => {
      debounce.start(btnUpdate, 500);
    });

    form.addEventListener(`submit`, () => {
      const name = userNameInput.value;
      this.onUserNameSubmit(name);
    });

    backElement.addEventListener(`click`, () => {
      this.onBack();
    });
  }

  onBack() {

  }

  onUserNameSubmit(name) {
    return name;
  }
}

class RulesPresenter {
  constructor() {
    this.view = new RulesView();
  }

  init() {
    changeView(this.view);
    this.view.onUserNameSubmit = (name) => {
      localStorage.setItem(`name`, name);
      app.showGame(name);
    };

    this.view.onBack = function () {
      app.showIntro();
    };
  }
}

const drawHeader = (state) =>
  `<h1 class="game__timer">${state.time}</h1>
  <div class="game__lives">
    ${new Array(3 - state.lives)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
    ${new Array(state.lives)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
  </div>`;

const GameContentClass = {
  "tinder-like": `game__content--wide`,
  "two-of-two": ``,
  "one-of-three": `game__content--triple`
};

const drawStats = (stats) =>
  stats.map((el) => `<li class="stats__result stats__result--${el}"></li>`).join(``);

class GameView$1 extends AbstractView {
  constructor(state, level) {
    super();
    this.state = state;
    this.level = level;
  }

  get template() {
    return `${this.gameHeaderTemplate}
            <div class="game">
              <p class="game__task">${this.level.question}</p>
              <form class="${`game__content ${GameContentClass[this.level.type]}`.trim()}">
                ${this.contentTemplate}
              </form>
              <div class="stats">
                <ul class="stats">
                  ${this.statsTemplate}
                </ul>
              </div>
            </div>`;
  }

  get contentTemplate() {
    return this.level.answers.map((answer, numb) => {
      const answerSizes = [answer.image.naturalWidth, answer.image.naturalHeight,
        answer.image.width, answer.image.height];
      // Gets proper image size properties depending on frame size
      const imageSizeProps = this.getImageSizeProperties(...answerSizes);

      return `<div class="game__option">
                <img src="${answer.image.url}" width=${imageSizeProps.widthProp} height=${imageSizeProps.heightProp} alt="Option ${numb + 1}">
                <label class="game__answer game__answer--photo">
                    <input name="question${numb + 1}" type="radio" value="photo">
                    <span>Фото</span>
                  </label>
                  <label class="game__answer game__answer--paint">
                    <input name="question${numb + 1}" type="radio" value="painting">
                    <span>Рисунок</span>
                  </label>
              </div>`;
    }).join(``);
  }

  get gameHeaderTemplate() {
    return headerTemplate(drawHeader(this.state));
  }

  get statsTemplate() {
    return drawStats(this.state.stats);
  }

  /**
   * Gets natural size of image and size of frame and calculate
   * proper css params for image width and height:
   * @param {number} nWidth - natural image width
   * @param {number} nHeight - natural image height
   * @param {number} fWidth - frame width
   * @param {number} fHeight - frame height
   * @return {object} - suitable css width and height properties 
   */
  getImageSizeProperties(nWidth, nHeight, fWidth, fHeight) {
    const imageWHratio = nWidth / nHeight;
    const frameWHration = fWidth / fHeight;

    const isImageWider = imageWHratio > frameWHration;
    const [widthProp, heightProp] = isImageWider ? [`100%`, `auto`] : [`auto`, `100%`];

    return {
      widthProp,
      heightProp
    };
  }

  bind() {
    this.backElement = this._element.querySelector(`.header__back`);
    this.timerElement = this._element.querySelector(`.game__timer`);

    this.backElement.addEventListener(`click`, () => {
      this.onBack();
    });
  }

  onAnswer(answer) {
    return answer;
  }

  onBack() {

  }

  updateTime(time) {
    if (time === 0) {
      this.onAnswer(false);
    } else {
      this.timerElement.textContent = time;
    }
  }
}

// Game view for "tinder-like" type

class GameType2View extends GameView$1 {
  constructor(state, level) {
    super(state, level);
  }

  bind() {
    const content = this._element.querySelector(`.game__content`);

    const onContentClickHandler = (e) => {
      if (e.target.closest(`input[type=radio]`)) {
        const givenValue = content.querySelector(`input[type=radio]:checked`).value;

        this.onAnswer(this.isAnswerCorrect(givenValue));
      }
    };

    content.addEventListener(`click`, onContentClickHandler);
    super.bind();
  }

  isAnswerCorrect(value) {
    return value === this.level.answers[0].type;
  }
}

// Game view for "two-of-two" type

class GameType1View extends GameView$1 {
  constructor(state, level) {
    super(state, level);
  }

  bind() {
    const content = this._element.querySelector(`.game__content`);
    const amountOfOptions = this.level.answers.length;

    const onContentClickHandler = (e) => {
      if (e.target.closest(`input[type=radio]`)) {
        const answers = content.querySelectorAll(`input[type=radio]:checked`);
        const amountOfGivenAnswers = answers.length;

        if (amountOfGivenAnswers === amountOfOptions) {
          const givenValues = Array.from(answers).map((el) => el.value);
          this.onAnswer(this.isAnswerCorrect(givenValues));
        }
      }
    };

    content.addEventListener(`click`, onContentClickHandler);
    super.bind();
  }

  isAnswerCorrect(values) {
    const wrongAnswer = this.level.answers.find((answer, numb) => {
      return answer.type !== values[numb];
    });

    return (!wrongAnswer) ? true : false;
  }
}

// Game view for "one-of-three" type

class GameType1View$1 extends GameView$1 {
  constructor(state, level) {
    super(state, level);
  }

  get contentTemplate() {
    return this.level.answers.map((answer, numb) => {
      const answerSizes = [answer.image.naturalWidth, answer.image.naturalHeight,
        answer.image.width, answer.image.height];
      // Gets proper image size properties depending on frame size
      const imageSizeProps = this.getImageSizeProperties(...answerSizes);

      return `<div class="game__option">
                <img src="${answer.image.url}" width=${imageSizeProps.widthProp} height=${imageSizeProps.heightProp} alt="Option ${numb + 1}">
              </div>`;
    }).join(``);
  }

  bind() {
    const content = this._element.querySelector(`.game__content`);

    const onContentClickHandler = (e) => {
      const selectedOpt = e.target.closest(`.game__option`);

      if (selectedOpt) {
        selectedOpt.classList.add(`game__option--selected`);
        const url = selectedOpt.querySelector(`img`).src;
        this.onAnswer(this.isAnswerCorrect(url));
      }
    };

    content.addEventListener(`click`, onContentClickHandler);
    super.bind();
  }

  isAnswerCorrect(url) {
    const type = (~this.level.question.indexOf(`рисунок`)) ? `painting` : `photo`;
    const correctAnswer = this.level.answers.find((answer) => {
      return answer.image.url === url && answer.type === type;
    });

    return (correctAnswer) ? true : false;
  }
}

class SpinningStar extends AbstractView {
  get template() {
    return `<div id="main" class="central__content">
              <div class="rolling-star">
                <h1 class="rolling-star__asterisk">*</h1>
              </div>
            </div>`;
  }
}

const ALIVE = `alive`;
const SLOW = `slow`;
const FAST = `fast`;
const CORRECT = `correct`;
const WRONG = `wrong`;

const resultType = {
  SLOW,
  FAST,
  CORRECT,
  WRONG
};

const bonuses = Object.freeze({
  [FAST]: {
    title: `Бонус за скорость`,
    classTitle: FAST,
    cost: 50
  },
  [ALIVE]: {
    title: `Бонус за жизнь`,
    classTitle: ALIVE,
    cost: 50
  },
  [SLOW]: {
    title: `Штраф за медлительность`,
    classTitle: SLOW,
    cost: -50
  }
});

const POINT_PER_ANSWER = 100;

const getBonus = (bonusName, amount) => {
  if (!amount) {
    return null;
  }

  const bonus = bonuses[bonusName];

  if (!bonus) {
    throw new Error(`The bonus is undefined`);
  } else {
    return {
      title: bonus.title,
      classTitle: bonus.classTitle,
      amount,
      points: amount * bonus.cost
    };
  }
};

/**
 * Builds the object that contains scores and bonuses informatin.
 * @param {array} stats - list of user's result
 * @param {number} lives - amount of lives that left in the end
 * @return {obj}
 */
const getTableData = (stats, lives) => {
  // Each right answer gives some point
  const totalResult = stats.filter((el) => el !== `wrong`).length * POINT_PER_ANSWER;

  /**
   * Builds objects that contains "name of bonus": bonus amount, then
   * replace this object with array of objects. Each object in that array
   * represents iformation about bonus.
   @return {object} for detailed information look at getBonus function return.
   */
  const tableBonuses = (function () {
    let bonusMap = {
      [FAST]: stats.filter((el) => el === FAST).length,
      [SLOW]: stats.filter((el) => el === SLOW).length,
      [ALIVE]: lives,
    };

    return Object.entries(bonusMap).map((pair) => {
      return getBonus(pair[0], pair[1]); // pair[0] - bonus name, pair[1] - bonus amount
    }).filter((el) => el !== null);
  }());

  // Accumulate all bonuses points and points that were given for each answer
  const totalFinal = tableBonuses
      .reduce((accum, bonus) => {
        return accum + bonus.points;
      }, totalResult);

  return {
    totalResult,
    tableBonuses,
    totalFinal
  };
};

const tick = (state) => {
  const currentState = Object.assign({}, state);
  currentState.time += -1;

  return currentState;
};

const INITIAL_LEVEL = 1;
const MAX_TIME = 30;
const MAX_LIVES = 3;
const INITIAL_STATS = new Array(10).fill(`unknown`);

const initialState = Object.freeze({
  gameNumb: INITIAL_LEVEL,
  time: MAX_TIME,
  lives: MAX_LIVES,
  stats: INITIAL_STATS
});

/**
 * Defines user result depending on his performance.
 * @param {number} answerTime - The time that the user spent giving an answer.
 * @param {boolean} answerCorrect - Was the answer correct or not.
 * @return {string} - result.
 */

const getResult = (answerTime, answerCorrect) => {
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

const incLevel = (state) => {
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

const setResult = (state, levelResult) => {
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

const GameView = {
  "tinder-like": GameType2View,
  "two-of-two": GameType1View,
  "one-of-three": GameType1View$1
};

class GamePresenter {
  constructor(levels, userName) {
    this.userName = userName;
    this.levels = levels;
    this.state = initialState;
    this.initialTime = this.state.time;
    this.view = new GameView[this.level.type](this.state, this.level);
    this.loadingScreen = new SpinningStar();
  }

  get level() {
    return this.levels[this.state.gameNumb - 1];
  }

  /**
   * It's important to remember that this method
   * creates a lot of closures inside. Timer recursively
   * recreates itself calling method this.view.updateTime
   * each tick. If we want to stop the game, just changing
   * the view is not enough, becouse it wont stop the timer.
   * Once time is over this.view.updateTime will execute
   * this.view.OnAnswer that returns game process.
   */
  startTimer() {
    const action = () => {
      this.state = tick(this.state);
      this.view.updateTime(this.state.time);
      this.timer = setTimeout(action, 1000);
    };
    this.timer = setTimeout(action, 1000);
  }

  stopTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  imagePreLoader() {
    const loadingPromises = [];

    // Preloads pictures from current level
    this.level.answers.map((answer) => {
      const loader = imageLoader(answer.image.url).
          /**
           * In case of success, write down natural sizes of loaded image
           * into properties of level.answer.image object
           */
          then((imageNaturalSizes) => {
            answer.image.naturalHeight = imageNaturalSizes.naturalHeight;
            answer.image.naturalWidth = imageNaturalSizes.naturalWidth;
          }, () => {
            // In case of  error shows intro screen
            this.view.onBack();
          });
      // Accumulates all pictures loadings in the array
      loadingPromises.push(loader);
    });

    return Promise.all(loadingPromises);
  }

  init() {
    changeView(this.loadingScreen);
    this.imagePreLoader().then(() => {
      // Show current game screen and then start the timer
      changeView(this.view);
      this.startTimer();
    });

    // While downloading pictures overrides view methods

    /**
     * Gets answer and considers next step depending on current state.
     * @param {boolean} answer - answer given by user
     * @return {void}
     */
    this.view.onAnswer = (answer) => {
      this.stopTimer();
      const answerDuration = this.initialTime - this.state.time;
      const isAnswCorrect = answer;
      const result = getResult(answerDuration, isAnswCorrect);

      // if it's last level, show statistics screen
      if (this.state.gameNumb === this.state.stats.length) {
        changeView(this.loadingScreen);
        this.state = setResult(this.state, result);

        const statsObj = {
          stats: this.state.stats,
          lives: this.state.lives
        };
        app.showStats(this.userName, statsObj);
        // if level is not last, make a new view depending on level type and execute init method recursively
      } else {
        this.state = setResult(this.state, result);
        const nextLevel = this.level;
        this.view = new GameView[nextLevel.type](this.state, nextLevel);
        this.init();
      }
    };

    this.view.onBack = () => {
      this.stopTimer();
      app.restart();
    };
  }
}

class StatsrView extends AbstractView {
  constructor(resultTable) {
    super();
    this.resultTable = resultTable.reverse();
  }

  makeStatsTemplate(stats) {
    return `<ul class="stats">
              ${drawStats(stats)}
            </ul>`;
  }

  get template() {
    let currentGameTitle;
    const resultsTemplate = this.resultTable.map((resultObj, numb) => {
      const isWin = resultObj.lives > 0;

      if (numb === 0 && isWin) {
        currentGameTitle = true;
      }

      let resultContent;

      if (isWin) {
        const {totalResult, tableBonuses, totalFinal} = getTableData(resultObj.stats, resultObj.lives);
        resultContent =
          `<table class="result__table">
            <tr>
              <td class="result__number">${numb + 1}.</td>
              <td colspan="2">${this.makeStatsTemplate(resultObj.stats)}</td>
              <td class="result__points">×&nbsp;100</td>
              <td class="result__total">${totalResult}</td>
            </tr>
            ${tableBonuses.map((bonus) =>
            `<tr>
              <td></td>
              <td class="result__extra">${bonus.title}:</td>
              <td class="result__extra">${bonus.amount}&nbsp;<span class="stats__result stats__result--${bonus.classTitle}"></span></td>
              <td class="result__points">×&nbsp;50</td>
              <td class="result__total">${bonus.points}</td>
            </tr>`).join(``).trim()}
            <tr>
              <td colspan="5" class="result__total  result__total--final">${totalFinal}</td>
            </tr>
          </table>\n`;
      } else {
        resultContent =
          `<table class="result__table">
            <tr>
              <td class="result__number">${numb + 1}.</td>
              <td></td>
              <td class="result__total">${this.makeStatsTemplate(resultObj.stats)}</td>
              <td class="result__total  result__total--final">fail</td>
            </tr>
          </table>\n`;
      }

      return resultContent;
    }).join(``).trim();

    return `${headerTemplate()}
            <div class="result">
              ${currentGameTitle ? `<h1>Победа!</h1>\n` : ``}
              ${resultsTemplate}
            </div>\n`.trim();
  }

  bind() {
    const backElement = this._element.querySelector(`.header__back`);

    backElement.addEventListener(`click`, () => {
      this.onBack();
    });
  }

  onBack() {

  }
}

class Model {
  get urlRead() {
    throw new Error(`Abstract method. You need to define method first`);
  }

  get urlWrite() {
    throw new Error(`Abstract method. You need to define method first`);
  }

  load() {
    return fetch(this.urlRead)
        .then((resp) => resp.json());
  }

  send(data) {
    const requestSettings = {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`
      },
      body: JSON.stringify(data)
    };

    return fetch(this.urlWrite, requestSettings);
  }
}

class StatsPresenter {
  constructor(userResult, userName) {
    this.userResult = userResult;
    this.model = new class extends Model {
      get urlRead() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/stats/${userName}`;
      }

      get urlWrite() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/stats/${userName}`;
      }
    }();
  }

  showUserResultTable() {
    this.model.load()
        .then((resultTable) => {
          this.view = new StatsrView(resultTable);

          this.view.onBack = () => {
            app.restart();
          };
        })
        .then(() => changeView(this.view))
        .catch(window.console.error);
  }

  init() {
    if (this.userResult) {
      this.model.send(this.userResult)
          .then(() => this.showUserResultTable());
    } else {

      this.showUserResultTable();
    }
  }
}

const ControllerID = {
  INTRO: ``,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`
};

const getControllerVariablesFromHash = (hash) => {
  return hash ? hash.replace(`#`, ``).split(`?`) : [``];
};

class Application {
  constructor() {
    this.preloadingScreen = new SpinningStar();
    this.userName = `Guest`;
    this.model = new class extends Model {
      get urlRead() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/questions`;
      }
    }();
  }

  loadData() {
    changeView(this.preloadingScreen);
    return new Promise((resolve) => {
      this.model.load()
          .then((data) => {
            this.setup();
            this.gameData = data;
            resolve();
          })
          .catch(window.console.error);
    });
  }

  restart() {
    this.loadData()
        .then(() => {
          this.showIntro();
        });
  }

  changeController(route = ``, ...variables) {
    let controller;
    let userName;

    switch (route) {
      case ControllerID.GAME:
        [userName] = variables;
        controller = new this.routes[route](this.gameData, userName);
        break;
      case ControllerID.STATS:
        [userName] = variables;
        controller = new this.routes[route](this.userResult, userName);
        break;

      default:
        controller = new this.routes[route]();
        break;
    }

    controller.init();
  }

  setup() {
    this.routes = {
      [ControllerID.INTRO]: IntroPresenter,
      [ControllerID.GREETING]: GreetingPresentor,
      [ControllerID.RULES]: RulesPresenter,
      [ControllerID.GAME]: GamePresenter,
      [ControllerID.STATS]: StatsPresenter
    };
  }

  init() {
    window.onhashchange = () => {
      this.changeController(...getControllerVariablesFromHash(location.hash));
    };

    this.loadData()
        .then(() => this.changeController(...getControllerVariablesFromHash(location.hash)));
  }

  showIntro() {
    location.hash = ControllerID.INTRO;
  }

  showGreeting() {
    location.hash = ControllerID.GREETING;
  }

  showRules() {
    location.hash = ControllerID.RULES;
  }

  showGame(userName) {
    location.hash = `${ControllerID.GAME}?${userName}`;
  }

  showStats(userName, userResult) {
    this.userResult = userResult;
    location.hash = `${ControllerID.STATS}?${userName}`;
  }
}

const app = new Application();

window.addEventListener(`load`, () => {
  app.init();
});

}());

//# sourceMappingURL=main.js.map
