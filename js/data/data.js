export const levels = Object.freeze([
  {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    options: [`http://placehold.it/468x458`, `http://placehold.it/468x458`],
  },
  {
    task: `Угадай, фото или рисунок?`,
    options: [`http://placehold.it/705x455`]
  },
  {
    task: `Найдите рисунок среди изображений`,
    hasNotInput: true,
    options: [`http://placehold.it/304x455`, `http://placehold.it/304x455`, `http://placehold.it/304x455`]
  }
]);

export const getLevel = (gameNumb) => {
  return levels[gameNumb - 1];
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
const LIFE = `life`;

export const resultType = {
  SLOW,
  FAST,
  CORRECT,
  WRONG
};

/**
 * Gets state, makes copy and sets result of the game in the copy.
 * @param {obj} state - Initial state or state of previous game.
 * @param {string} result - Word, describing user performance
 * @return {obj} - new state.
 */

export const setResult = (state, levelResult) => {
  const currentState = Object.assign({}, state, {
    stats: state.stats.slice()
  });

  currentState.stats[state.gameNumb - 1] = levelResult;

  if (levelResult === `wrong`) {
    decLives(currentState);
  }

  if (currentState.gameNumb < 3) {
    incLevel(currentState);
  }

  return currentState;
};

const bonuses = Object.freeze({
  [FAST]: {
    title: `Бонус за скорость`,
    cost: 50
  },
  [LIFE]: {
    title: `Бонус за жизнь`,
    cost: 50
  },
  [SLOW]: {
    title: `Штраф за медлительность`,
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
        amount,
        points: amount * bonus.cost
      };
  }
};

export const getTableData = (state) => {
  const totalResult = state.stats.filter((el) => el !== `wrong`).length * 100;
  const bonuses = (function () {
    let content = {
      [FAST]: state.stats.filter((el) => el === FAST).length,
      [SLOW]: state.stats.filter((el) => el === SLOW).length,
      [LIFE]: state.lives
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

export const isWin = (state) => {
  return state.lives > 0;
};
