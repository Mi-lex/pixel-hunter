const PAINT = `paint`;
const PHOTO = `photo`;

export const levels = Object.freeze([
  {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    options: [`http://placehold.it/468x458`, `http://placehold.it/468x458`],
    answer: [PAINT, PHOTO]
  },
  {
    task: `Угадай, фото или рисунок?`,
    options: [`http://placehold.it/705x455`],
    answer: [PAINT]
  },
  {
    task: `Найдите рисунок среди изображений`,
    hasNotInput: true,
    options: [`http://placehold.it/304x455`, `http://placehold.it/304x455`, `http://placehold.it/304x455`],
    answer: `http://placehold.it/304x455`
  },
  {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    options: [`http://placehold.it/468x458`, `http://placehold.it/468x458`],
    answer: [PAINT, PHOTO]
  },
  {
    task: `Угадай, фото или рисунок?`,
    options: [`http://placehold.it/705x455`],
    answer: [PAINT]
  },
  {
    task: `Найдите рисунок среди изображений`,
    hasNotInput: true,
    options: [`http://placehold.it/304x455`, `http://placehold.it/304x455`, `http://placehold.it/304x455`],
    answer: `http://placehold.it/304x455`
  },
  {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    options: [`http://placehold.it/468x458`, `http://placehold.it/468x458`],
    answer: [PAINT, PHOTO]
  },
  {
    task: `Угадай, фото или рисунок?`,
    options: [`http://placehold.it/705x455`],
    answer: [PAINT]
  },
  {
    task: `Найдите рисунок среди изображений`,
    hasNotInput: true,
    options: [`http://placehold.it/304x455`, `http://placehold.it/304x455`, `http://placehold.it/304x455`],
    answer: `http://placehold.it/304x455`
  },
  {
    task: `Угадай, фото или рисунок?`,
    options: [`http://placehold.it/705x455`],
    answer: [PAINT]
  }
]);

export const getLevel = (gameNumb) => {
  return levels[gameNumb - 1];
};

const LevelTypes = {
  1: `game__content--wide`,
  2: ``,
  3: `game__content--triple`
};

export const getLevelType = (level) => {
  const amountOfOptions = level.options.length;
  return LevelTypes[amountOfOptions];
};

export const isAnswerCorrect = (answer, state) => {
  const level = getLevel(state.gameNumb);

  if (Array.isArray(answer)) {
    return JSON.stringify(answer) === JSON.stringify(level.answer);
  } else {
      return answer === level.answer;
  }
};

export const initialState = Object.freeze({
  gameNumb: 1,
  time: 30,
  lives: 3,
  stats: new Array(10).fill(`unknown`)
});

export const incLevel = (state) => {
  state.gameNumb += 1;
};

const decLives = (state) => {
  if (state.lives === 0) {
    return;
  }
  state.lives += -1;
};

const SLOW = `slow`;
const FAST = `fast`;
const CORRECT = `correct`;
const WRONG = `wrong`;
const ALIVE = `alive`;

export const resultType = {
  SLOW,
  FAST,
  CORRECT,
  WRONG
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

export const tick = (state) => {
  const currentState = Object.assign({}, state);
  currentState.time += -1;

  return currentState;
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

export const getBonus = (bonusName, amount) => {
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

export const getTableData = (stats) => {
  const totalResult = stats.filter((el) => el !== `wrong`).length * 100;
  const bonuses = (function () {
    let content = {
      [FAST]: stats.filter((el) => el === FAST).length,
      [SLOW]: stats.filter((el) => el === SLOW).length,
      [ALIVE]: 3 - stats.filter((el) => el === WRONG).length,
    };

    return Object.entries(content).map((pair) => {
      return getBonus(pair[0], pair[1]);
    }).filter((el) => el !== null);
  }());

  const totalFinal = bonuses
      .reduce((accum, bonus) => {
        return accum + bonus.points;
      }, totalResult);

  return {
    totalResult,
    bonuses,
    totalFinal
  };
};

export const isWin = (stats) => {
  return stats.filter((el) => el === WRONG).length < 3;
};

const statsHashParams = [
  resultType.WRONG,   // 0
  resultType.SLOW,    // 1
  resultType.CORRECT, // 2
  resultType.FAST     // 3
];


export const statsHashCypher = (stats) => {
  return stats.map((el) => statsHashParams.indexOf(el)).join(``);
};

export const statsHashDecypher = (params) => {
  if (params.length !== initialState.stats.length) {
    throw new RangeError(`Amount of answers is not equal to amount of questions`);
  } else {
      return params.split(``).map((numb) => statsHashParams[Number(numb)]);
  }
};
