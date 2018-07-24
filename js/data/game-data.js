import {resultType} from "../data/stats-data";

const PAINT = `paint`;
const PHOTO = `photo`;

const levels = Object.freeze([
  {
  "type": "one-of-three",
  "question": "Найдите фото среди изображений",
  "answers": [
    {
    "image": {
      "url": "http://placehold.it/304x455",
      "width": 304,
      "height": 455
      },
    "type": "painting"
    },
    {
    "image": {
      "url": "http://placehold.it/304x455",
      "width": 304,
      "height": 455
      },
    "type": "painting"
    },
    {
    "image": {
      "url": "http://placehold.it/304x455",
      "width": 304,
      "height": 455
    },
    "type": "photo"
  }]
},
{
  "type": "tinder-like",
  "question": "Угадай, фото или рисунок?",
  "answers": [{
    "image": {
      "url": "http://placehold.it/705x455",
      "width": 705,
      "height": 455
    },
    "type": "photo"
  }]
},
{
  "type": "tinder-like",
  "question": "Угадай, фото или рисунок?",
  "answers": [{
    "image": {
      "url": "http://placehold.it/705x455",
      "width": 705,
      "height": 455
    },
    "type": "photo"
  }]
},
{
  "type": "tinder-like",
  "question": "Угадай, фото или рисунок?",
  "answers": [{
    "image": {
      "url": "http://placehold.it/705x455",
      "width": 705,
      "height": 455
    },
    "type": "painting"
  }]
},
{
  "type": "one-of-three",
  "question": "Найдите рисунок среди изображений",
  "answers": [{
    "image": {
      "url": "http://placehold.it/304x455",
      "width": 304,
      "height": 455
    },
    "type": "photo"
  }, {
    "image": {
      "url": "http://placehold.it/304x455",
      "width": 304,
      "height": 455
    },
    "type": "photo"
  }, {
    "image": {
      "url": "http://placehold.it/304x455",
      "width": 304,
      "height": 455
    },
    "type": "painting"
  }]
},
{
  "type": "one-of-three",
  "question": "Найдите рисунок среди изображений",
  "answers": [{
    "image": {
      "url": "http://placehold.it/304x455",
      "width": 304,
      "height": 455
    },
    "type": "photo"
  }, {
    "image": {
      "url": "http://placehold.it/304x455",
      "width": 304,
      "height": 455
    },
    "type": "photo"
  }, {
    "image": {
      "url": "http://placehold.it/304x455",
      "width": 304,
      "height": 455
    },
    "type": "painting"
  }]
}, {
  "type": "tinder-like",
  "question": "Угадай, фото или рисунок?",
  "answers": [{
    "image": {
      "url": "http://placehold.it/705x455",
      "width": 705,
      "height": 455
    },
    "type": "painting"
  }]
}, {
  "type": "two-of-two",
  "question": "Угадайте для каждого изображения фото или рисунок?",
  "answers": [{
    "image": {
      "url": "http://placehold.it/468x458",
      "width": 468,
      "height": 458
    },
    "type": "photo"
  }, {
    "image": {
      "url": "http://placehold.it/468x458",
      "width": 468,
      "height": 458
    },
    "type": "photo"
  }]
}, {
  "type": "tinder-like",
  "question": "Угадай, фото или рисунок?",
  "answers": [{
    "image": {
      "url": "http://placehold.it/705x455",
      "width": 705,
      "height": 455
    },
    "type": "photo"
  }]
}, {
  "type": "one-of-three",
  "question": "Найдите фото среди изображений",
  "answers": [{
    "image": {
      "url": "http://placehold.it/304x455",
      "width": 304,
      "height": 455
    },
    "type": "painting"
  }, {
    "image": {
      "url": "http://placehold.it/304x455",
      "width": 304,
      "height": 455
    },
    "type": "painting"
  }, {
    "image": {
      "url": "http://placehold.it/304x455",
      "width": 304,
      "height": 455
    },
    "type": "photo"
  }]
}]
);

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
