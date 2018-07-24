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

export const tick = (state) => {
  const currentState = Object.assign({}, state);
  currentState.time += -1;

  return currentState;
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
